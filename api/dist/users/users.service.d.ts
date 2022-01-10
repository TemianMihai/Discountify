import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { UserModel } from './models/user.model';
import { Tokens } from './input/tokens.input';
import { UpdateUserInput } from './input/update.user.input';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
export declare class UsersService {
    private readonly userRepository;
    private readonly configService;
    constructor(userRepository: Repository<UserModel>, configService: ConfigService);
    generateActivationKey(): string;
    createToken(payload: JwtPayload, secret: string, expiresIn: string | null): any;
    activate(activationKey: string): Promise<UserModel>;
    generateTokens(user: UserModel): Promise<Tokens>;
    register(email: string, password: string, firstName: string, lastName: string): Promise<UserModel>;
    getById(id: string): Promise<UserModel>;
    validateUser(payload: JwtPayload): Promise<UserModel>;
    login(email: string, password: string): Promise<UserModel>;
    update(updateUser: UpdateUserInput, userID: string): Promise<UserModel>;
}
