import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CompanyModel } from './models/company.model';
import { Tokens } from './input/tokens.input';
import { UpdateCompanyInput } from './input/update.company.input';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
export declare class CompanyService {
    private readonly companyRepository;
    private readonly configService;
    constructor(companyRepository: Repository<CompanyModel>, configService: ConfigService);
    generateActivationKey(): string;
    createToken(payload: JwtPayload, secret: string, expiresIn: string | null): any;
    activate(activationKey: string): Promise<CompanyModel>;
    generateTokens(company: CompanyModel): Promise<Tokens>;
    register(email: string, password: string, companyName: string, address: string): Promise<CompanyModel>;
    getById(id: string): Promise<CompanyModel>;
    validateCompany(payload: JwtPayload): Promise<CompanyModel>;
    login(email: string, password: string): Promise<CompanyModel>;
    update(updateCompany: UpdateCompanyInput, companyID: string): Promise<CompanyModel>;
}
