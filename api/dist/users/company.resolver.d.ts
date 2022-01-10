import { GraphQLExecutionContext } from '@nestjs/graphql';
import { CompanyModel } from './models/company.model';
import { CompanyService } from './company.service';
import { Tokens } from './input/tokens.input';
import { ActivateUserInput } from './input/activate.input';
import { LoginInput } from './input/login.input';
import { RegistrationCompanyInput } from './input/registration.company.input';
import { UpdateCompanyInput } from './input/update.company.input';
export declare class CompanyResolver {
    private readonly companyService;
    constructor(companyService: CompanyService);
    registerCompany(registerData: RegistrationCompanyInput): Promise<CompanyModel>;
    activateCompany(ctx: GraphQLExecutionContext, activateData: ActivateUserInput): Promise<Tokens>;
    loginCompany(ctx: GraphQLExecutionContext, loginData: LoginInput): Promise<Tokens>;
    updateCompany(company: CompanyModel, updateData: UpdateCompanyInput): Promise<CompanyModel>;
    getCompany(companyModel: CompanyModel, id: string): Promise<CompanyModel>;
}
