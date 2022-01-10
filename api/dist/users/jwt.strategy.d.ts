import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { UsersService } from './users.service';
import { CompanyService } from './company.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    private readonly companyService;
    private readonly configService;
    constructor(userService: UsersService, companyService: CompanyService, configService: ConfigService);
    validate(payload: JwtPayload, done: Function): Promise<any>;
}
export {};
