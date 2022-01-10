"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const users_decorator_1 = require("./users.decorator");
const gqlauthguard_1 = require("./gqlauthguard");
const company_model_1 = require("./models/company.model");
const company_service_1 = require("./company.service");
const tokens_input_1 = require("./input/tokens.input");
const activate_input_1 = require("./input/activate.input");
const login_input_1 = require("./input/login.input");
const registration_company_input_1 = require("./input/registration.company.input");
const update_company_input_1 = require("./input/update.company.input");
let CompanyResolver = class CompanyResolver {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async registerCompany(registerData) {
        const company = await this.companyService.register(registerData.email, registerData.password, registerData.companyName, registerData.address);
        if (!company) {
            throw new common_1.HttpException('Error registering user. Try again!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return company;
    }
    async activateCompany(ctx, activateData) {
        const user = await this.companyService.activate(activateData.activationKey);
        if (!user) {
            throw new common_1.HttpException('Invalid activation email link. Please contact us via email.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const { accessToken, refreshToken } = await this.companyService.generateTokens(user);
        ctx['res'].cookie('RefreshToken', refreshToken, { httpOnly: true });
        return {
            accessToken,
        };
    }
    async loginCompany(ctx, loginData) {
        const company = await this.companyService.login(loginData.email, loginData.password);
        if (!company) {
            throw new common_1.HttpException('Incorrect email or password. Try again!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const { accessToken, refreshToken } = await this.companyService.generateTokens(company);
        ctx['res'].cookie('RefreshToken', refreshToken, { httpOnly: true });
        return {
            accessToken,
        };
    }
    async updateCompany(company, updateData) {
        return await this.companyService.update(updateData, company.id);
    }
    async getCompany(companyModel, id) {
        return await this.companyService.getById(id);
    }
};
__decorate([
    graphql_1.Mutation((returns) => company_model_1.CompanyModel, { name: 'registerCompany', nullable: true }),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_company_input_1.RegistrationCompanyInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "registerCompany", null);
__decorate([
    graphql_1.Mutation((returns) => tokens_input_1.Tokens, { name: 'activateCompany', nullable: true }),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, activate_input_1.ActivateUserInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "activateCompany", null);
__decorate([
    graphql_1.Mutation((returns) => tokens_input_1.Tokens, { name: 'loginCompany', nullable: true }),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "loginCompany", null);
__decorate([
    common_1.UseGuards(gqlauthguard_1.GqlAuthGuard),
    graphql_1.Mutation((returns) => company_model_1.CompanyModel, { name: 'updateCompany', nullable: true }),
    __param(0, users_decorator_1.User()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_model_1.CompanyModel, update_company_input_1.UpdateCompanyInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "updateCompany", null);
__decorate([
    common_1.UseGuards(gqlauthguard_1.GqlAuthGuard),
    graphql_1.Query((returns) => company_model_1.CompanyModel),
    __param(0, users_decorator_1.User()),
    __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_model_1.CompanyModel, String]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "getCompany", null);
CompanyResolver = __decorate([
    graphql_1.Resolver((of) => company_model_1.CompanyModel),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyResolver);
exports.CompanyResolver = CompanyResolver;
//# sourceMappingURL=company.resolver.js.map