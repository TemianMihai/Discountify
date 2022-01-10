import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtSecretRequestType } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import * as jwt from 'jsonwebtoken'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtPayload } from '../common/interfaces/jwt-payload.interface'
import { UsersService } from './users.service'
import { UserModel } from './models/user.model'
import { CompanyService } from './company.service'
import { CompanyModel } from './models/company.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly companyService: CompanyService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (
        requestType: JwtSecretRequestType,
        tokenOrPayload: string | Object | Buffer,
        done: Function,
      ) => {
        const globalJWTSecret = configService.get<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        )

        const payload =
          tokenOrPayload instanceof Object
            ? tokenOrPayload
            : jwt.decode(tokenOrPayload.toString())
        // eslint-disable-next-line @typescript-eslint/dot-notation
        if (!payload || !payload['id']) {
          return globalJWTSecret
        }

        const user = await this.userService.getById(payload['id'])
        if (user) {
          // eslint-disable-next-line no-void
          void userService
            .getById(payload['id']) // eslint-disable-line @typescript-eslint/dot-notation
            .then((user: UserModel) => {
              done(null, `${globalJWTSecret}-${user.email}-${user.password}`)
            })
            .catch(() => done(null, ''))
        } else {
          // eslint-disable-next-line no-void
          void companyService
            .getById(payload['id']) // eslint-disable-line @typescript-eslint/dot-notation
            .then((company: CompanyModel) => {
              done(null, `${globalJWTSecret}-${company.email}-${company.password}`)
            })
            .catch(() => done(null, ''))
        }
      },
    })
  }

  async validate(payload: JwtPayload, done: Function): Promise<any> {
    const user = await this.userService.validateUser(payload)
    const company = await this.companyService.validateCompany(payload)
    if (!user && !company) {
      return done(new UnauthorizedException(), false)
    }
    if (user) {
      done(null, user)
    } else {
      done(null, company)
    }
  }
}
