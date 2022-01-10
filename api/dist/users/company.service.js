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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("typeorm");
const ramda_1 = require("ramda");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const company_model_1 = require("./models/company.model");
let CompanyService = class CompanyService {
    constructor(companyRepository, configService) {
        this.companyRepository = companyRepository;
        this.configService = configService;
    }
    generateActivationKey() {
        return crypto.randomBytes(20).toString('hex');
    }
    createToken(payload, secret, expiresIn) {
        const options = expiresIn === null ? {} : { expiresIn };
        return jwt.sign(payload, secret, options);
    }
    async activate(activationKey) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() -
            parseInt(this.configService.get('USER_ACTIVATION_EXPIRE_DAYS')));
        const company = await this.companyRepository.findOne({
            where: {
                activationKey,
                createdAt: typeorm_2.MoreThan(expirationDate),
            },
        });
        if (!company) {
            return null;
        }
        company.isActive = true;
        const savedCompany = await this.companyRepository.save(company);
        return savedCompany;
    }
    async generateTokens(company) {
        const payload = { id: company.id };
        const accessToken = this.createToken(payload, `${this.configService.get('JWT_ACCESS_TOKEN_SECRET')}-${company.email}-${company.password}`, this.configService.get('JWT_ACCESS_TOKEN_EXPIRY'));
        if (!company.refreshToken) {
            const refreshToken = this.createToken(payload, `${this.configService.get('JWT_REFRESH_TOKEN_SECRET')}-${company.email}-${company.password}`, null);
            company.refreshToken = refreshToken;
            await this.companyRepository.save(company);
        }
        return {
            accessToken,
            refreshToken: company.refreshToken,
        };
    }
    async register(email, password, companyName, address) {
        const duplicate = await this.companyRepository.findOne({
            where: { email: email },
        });
        if (duplicate) {
            throw new common_1.HttpException('Email already taken', common_1.HttpStatus.CONFLICT);
        }
        if (password === undefined)
            password = '';
        const company = new company_model_1.CompanyModel();
        company.password = password;
        company.email = email;
        company.companyName = companyName;
        company.address = address;
        company.activationKey = this.generateActivationKey();
        return await this.companyRepository.save(company);
    }
    async getById(id) {
        return await this.companyRepository.findOne(id);
    }
    async validateCompany(payload) {
        return await this.getById(payload.id.toString());
    }
    async login(email, password) {
        if (password === '') {
            throw new common_1.HttpException('Empty password', common_1.HttpStatus.BAD_REQUEST);
        }
        const company = await this.companyRepository
            .createQueryBuilder()
            .where('LOWER(email) = LOWER(:email)', { email })
            .getOne();
        if (!company) {
            return company;
        }
        if (ramda_1.not(company.isActive)) {
            throw new common_1.HttpException('Ops, the current company is not active. Please activate your account by clicking the activation link from your email.', common_1.HttpStatus.BAD_REQUEST);
        }
        const isValid = await bcrypt.compare(password, company.password);
        return isValid ? company : null;
    }
    async update(updateCompany, companyID) {
        const result = await this.companyRepository.update(companyID, { ...updateCompany });
        if (!result) {
            return null;
        }
        const company = await this.getById(companyID);
        company.isComplete = company.shouldBeCompleted();
        return await this.companyRepository.save(company);
    }
};
CompanyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_model_1.CompanyModel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map