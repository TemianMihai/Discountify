import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { MoreThan, Repository } from 'typeorm'
import { not } from 'ramda'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

import { CompanyModel } from './models/company.model'

import { Tokens } from './input/tokens.input'
import { UpdateCompanyInput } from './input/update.company.input'

import { JwtPayload } from '../common/interfaces/jwt-payload.interface'


@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyModel)
    private readonly companyRepository: Repository<CompanyModel>,
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

  async activate(activationKey: string): Promise<CompanyModel> {
    const expirationDate = new Date()
    expirationDate.setDate(
      expirationDate.getDate() -
      parseInt(this.configService.get('USER_ACTIVATION_EXPIRE_DAYS')),
    )

    const company = await this.companyRepository.findOne({
      where: {
        activationKey,
        createdAt: MoreThan(expirationDate),
      },
    })

    if (!company) {
      return null
    }

    company.isActive = true

    const savedCompany = await this.companyRepository.save(company)
    return savedCompany;
  }

  async generateTokens(company: CompanyModel): Promise<Tokens> {
    const payload = { id: company.id }

    const accessToken = this.createToken(
      payload,
      `${this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET')}-${
        company.email
      }-${company.password}`,
      this.configService.get('JWT_ACCESS_TOKEN_EXPIRY'),
    )

    if (!company.refreshToken) {
      const refreshToken = this.createToken(
        payload,
        `${this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')}-${
          company.email
        }-${company.password}`,
        null,
      )

      company.refreshToken = refreshToken
      await this.companyRepository.save(company)
    }

    return {
      accessToken,
      refreshToken: company.refreshToken,
    }
  }

  async register(email: string, password: string, companyName: string, address: string): Promise<CompanyModel> {
    const duplicate = await this.companyRepository.findOne({
      where: { email: email },
    })

    if (duplicate) {
      throw new HttpException('Email already taken', HttpStatus.CONFLICT)
    }

    if (password === undefined) password = ''

    const company = new CompanyModel()
    company.password = password
    company.email = email
    company.companyName = companyName
    company.address = address
    company.activationKey = this.generateActivationKey()

    return await this.companyRepository.save(company)
  }

  async getById(id: string): Promise<CompanyModel> {
    return await this.companyRepository.findOne(id)
  }

  async validateCompany(payload: JwtPayload): Promise<CompanyModel> {
    return await this.getById(payload.id.toString())
  }

  async login(email: string, password: string): Promise<CompanyModel> {
    if (password === '') {
      throw new HttpException('Empty password', HttpStatus.BAD_REQUEST)
    }

    const company = await this.companyRepository
      .createQueryBuilder()
      .where('LOWER(email) = LOWER(:email)', { email })
      .getOne()
    if (!company) {
      return company
    }

    if (not(company.isActive)) {
      throw new HttpException(
        'Ops, the current company is not active. Please activate your account by clicking the activation link from your email.',
        HttpStatus.BAD_REQUEST,
      )
    }

    const isValid = await bcrypt.compare(password, company.password)
    return isValid ? company : null
  }

  async update(updateCompany: UpdateCompanyInput, companyID: string): Promise<CompanyModel> {
    const result = await this.companyRepository.update(companyID, { ...updateCompany })

    if (!result) {
      return null
    }

    const company = await this.getById(companyID)

    company.isComplete = company.shouldBeCompleted()

    return await this.companyRepository.save(company)
  }
}
