import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'

import { User as CurrentUser } from './users.decorator'

import { GqlAuthGuard } from './gqlauthguard'

import { UserModel } from './models/user.model'

import { UsersService } from './users.service'

import { RegistrationUserInput } from './input/registration.user.input'
import { Tokens } from './input/tokens.input'
import { ActivateUserInput } from './input/activate.input'
import { LoginInput } from './input/login.input'
import { UpdateUserInput } from './input/update.user.input'

@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @Mutation((returns) => UserModel, { name: 'registerUser', nullable: true })
  async registerUser(
    @Args('input') registerData: RegistrationUserInput,
  ): Promise<UserModel> {
    const user = await this.usersService.register(
      registerData.email,
      registerData.password,
      registerData.firstName,
      registerData.lastName,
    )
    if (!user) {
      throw new HttpException(
        'Error registering user. Try again!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    return user
  }

  @Mutation((returns) => Tokens, { name: 'activateUser', nullable: true })
  async activateUser(
    @Context() ctx: GraphQLExecutionContext,
    @Args('input') activateData: ActivateUserInput,
  ): Promise<Tokens> {
    const user = await this.usersService.activate(activateData.activationKey)

    if (!user) {
      throw new HttpException(
        'Invalid activation email link. Please contact us via email.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    const { accessToken, refreshToken } =
      await this.usersService.generateTokens(user)
    ctx['res'].cookie('RefreshToken', refreshToken, { httpOnly: true }) // eslint-disable-line @typescript-eslint/dot-notation

    return {
      accessToken,
    }
  }

  @Mutation((returns) => Tokens, { name: 'loginUser', nullable: true })
  async loginUser(
    @Context() ctx: GraphQLExecutionContext,
    @Args('input') loginData: LoginInput,
  ): Promise<Tokens> {
    const user = await this.usersService.login(
      loginData.email,
      loginData.password,
    )

    if (!user) {
      throw new HttpException(
        'Incorrect email or password. Try again!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    const { accessToken, refreshToken } =
      await this.usersService.generateTokens(user)
    ctx['res'].cookie('RefreshToken', refreshToken, { httpOnly: true }) // eslint-disable-line @typescript-eslint/dot-notation

    return {
      accessToken,
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => UserModel, { name: 'updateUser', nullable: true })
  async updateUser(@CurrentUser() user: UserModel, @Args('input') updateData: UpdateUserInput): Promise<UserModel> {
    return await this.usersService.update(updateData, user.id)
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => UserModel)
  async getUser(
    @CurrentUser() user: UserModel,
    @Args('id') id: string,
  ): Promise<UserModel> {
    return await this.usersService.getById(id)
  }
}
