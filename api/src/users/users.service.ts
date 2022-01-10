import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { MoreThan, Repository } from 'typeorm'
import { not } from 'ramda'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

import { UserModel } from './models/user.model'

import { Tokens } from './input/tokens.input'
import { UpdateUserInput } from './input/update.user.input'

import { JwtPayload } from '../common/interfaces/jwt-payload.interface'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly configService: ConfigService,
  ) {
  }

  generateActivationKey(): string {
    return crypto.randomBytes(20).toString('hex')
  }

  createToken(
    payload: JwtPayload,
    secret: string,
    expiresIn: string | null,
  ): any {
    const options = expiresIn === null ? {} : { expiresIn }

    return jwt.sign(payload, secret, options)
  }

  async activate(activationKey: string): Promise<UserModel> {
    const expirationDate = new Date()
    expirationDate.setDate(
      expirationDate.getDate() -
      parseInt(this.configService.get('USER_ACTIVATION_EXPIRE_DAYS')),
    )

    const user = await this.userRepository.findOne({
      where: {
        activationKey,
        createdAt: MoreThan(expirationDate),
      },
    })

    if (!user) {
      return null
    }

    user.isActive = true

    const savedUser = await this.userRepository.save(user)
    return savedUser
  }

  async generateTokens(user: UserModel): Promise<Tokens> {
    const payload = { id: user.id }

    const accessToken = this.createToken(
      payload,
      `${this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET')}-${
        user.email
      }-${user.password}`,
      this.configService.get('JWT_ACCESS_TOKEN_EXPIRY'),
    )

    if (!user.refreshToken) {
      const refreshToken = this.createToken(
        payload,
        `${this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')}-${
          user.email
        }-${user.password}`,
        null,
      )

      user.refreshToken = refreshToken
      await this.userRepository.save(user)
    }

    return {
      accessToken,
      refreshToken: user.refreshToken,
    }
  }

  async register(email: string, password: string, firstName: string, lastName: string): Promise<UserModel> {
    const duplicate = await this.userRepository.findOne({
      where: { email: email },
    })

    if (duplicate) {
      throw new HttpException('Email already taken', HttpStatus.CONFLICT)
    }

    if (password === undefined) password = ''

    const user = new UserModel()
    user.password = password
    user.email = email
    user.firstName = firstName
    user.lastName = lastName
    user.activationKey = this.generateActivationKey()

    return await this.userRepository.save(user)
  }

  async getById(id: string): Promise<UserModel> {
    return await this.userRepository.findOne(id)
  }

  async validateUser(payload: JwtPayload): Promise<UserModel> {
    return await this.getById(payload.id.toString())
  }

  async login(email: string, password: string): Promise<UserModel> {
    if (password === '') {
      throw new HttpException('Empty password', HttpStatus.BAD_REQUEST)
    }

    const user = await this.userRepository
      .createQueryBuilder()
      .where('LOWER(email) = LOWER(:email)', { email })
      .getOne()
    if (!user) {
      return user
    }

    if (not(user.isActive)) {
      throw new HttpException(
        'Ops, the current user is not active. Please activate your account by clicking the activation link from your email.',
        HttpStatus.BAD_REQUEST,
      )
    }

    const isValid = await bcrypt.compare(password, user.password)
    return isValid ? user : null
  }

  async update(updateUser: UpdateUserInput, userID: string): Promise<UserModel> {
    const result = await this.userRepository.update(userID, { ...updateUser })

    if (!result) {
      return null
    }

    const user = await this.getById(userID)

    user.isComplete = user.shouldBeCompleted()

    return await this.userRepository.save(user)
  }
}
