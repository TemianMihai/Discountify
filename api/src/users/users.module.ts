import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService, ConfigModule } from '@nestjs/config'

import { DateScalar } from '../common/scalars/date.scalar'

import { CommonModule } from '../common/common.module'

import { BasicStrategy } from './basic.strategy'
import { JwtStrategy } from './jwt.strategy'

import { UserModel } from './models/user.model'
import { CompanyModel } from './models/company.model'

import { UsersResolver } from './users.resolver'
import { CompanyResolver } from './company.resolver'

import { CompanyService } from './company.service'
import { UsersService } from './users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    TypeOrmModule.forFeature([CompanyModel]),
    CommonModule,
    ConfigModule,
  ],
  providers: [
    UsersResolver,
    ConfigService,
    UsersService,
    CompanyResolver,
    CompanyService,
    DateScalar,
    JwtStrategy,
    BasicStrategy,
  ],
  exports: [UsersService, TypeOrmModule.forFeature([UserModel])],
})
export class UsersModule {
}
