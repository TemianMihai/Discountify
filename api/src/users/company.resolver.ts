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

import { CompanyModel } from './models/company.model'

import { CompanyService } from './company.service'

import { Tokens } from './input/tokens.input'
import { ActivateUserInput } from './input/activate.input'
import { LoginInput } from './input/login.input'
import { RegistrationCompanyInput } from './input/registration.company.input'
import { UpdateCompanyInput } from './input/update.company.input'

@Resolver((of) => CompanyModel)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {
  }

  @Mutation((returns) => CompanyModel, { name: 'registerCompany', nullable: true })
  async registerCompany(
    @Args('input') registerData: RegistrationCompanyInput,
  ): Promise<CompanyModel> {
    const company = await this.companyService.register(
      registerData.email,
      registerData.password,
      registerData.companyName,
      registerData.address,
    )
    if (!company) {
      throw new HttpException(
        'Error registering user. Try again!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    return company
  }

  @Mutation((returns) => Tokens, { name: 'activateCompany', nullable: true })
  async activateCompany(
    @Context() ctx: GraphQLExecutionContext,
    @Args('input') activateData: ActivateUserInput,
  ): Promise<Tokens> {
    const user = await this.companyService.activate(activateData.activationKey)

    if (!user) {
      throw new HttpException(
        'Invalid activation email link. Please contact us via email.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    const { accessToken, refreshToken } =
      await this.companyService.generateTokens(user)
    ctx['res'].cookie('RefreshToken', refreshToken, { httpOnly: true }) // eslint-disable-line @typescript-eslint/dot-notation

    return {
      accessToken,
    }
  }

  @Mutation((returns) => Tokens, { name: 'loginCompany', nullable: true })
  async loginCompany(
    @Context() ctx: GraphQLExecutionContext,
    @Args('input') loginData: LoginInput,
  ): Promise<Tokens> {
    const company = await this.companyService.login(
      loginData.email,
      loginData.password,
    )

    if (!company) {
      throw new HttpException(
        'Incorrect email or password. Try again!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    const { accessToken, refreshToken } =
      await this.companyService.generateTokens(company)
    ctx['res'].cookie('RefreshToken', refreshToken, { httpOnly: true }) // eslint-disable-line @typescript-eslint/dot-notation

    return {
      accessToken,
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => CompanyModel, { name: 'updateCompany', nullable: true })
  async updateCompany(@CurrentUser() company: CompanyModel, @Args('input') updateData: UpdateCompanyInput): Promise<CompanyModel> {
    return await this.companyService.update(updateData, company.id)
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => CompanyModel)
  async getCompany(
    @CurrentUser() companyModel: CompanyModel,
    @Args('id') id: string,
  ): Promise<CompanyModel> {
    return await this.companyService.getById(id)
  }
}
