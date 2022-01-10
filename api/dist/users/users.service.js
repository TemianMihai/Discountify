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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("typeorm");
const ramda_1 = require("ramda");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const user_model_1 = require("./models/user.model");
let UsersService = class UsersService {
    constructor(userRepository, configService) {
        this.userRepository = userRepository;
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
        const user = await this.userRepository.findOne({
            where: {
                activationKey,
                createdAt: typeorm_2.MoreThan(expirationDate),
            },
        });
        if (!user) {
            return null;
        }
        user.isActive = true;
        const savedUser = await this.userRepository.save(user);
        return savedUser;
    }
    async generateTokens(user) {
        const payload = { id: user.id };
        const accessToken = this.createToken(payload, `${this.configService.get('JWT_ACCESS_TOKEN_SECRET')}-${user.email}-${user.password}`, this.configService.get('JWT_ACCESS_TOKEN_EXPIRY'));
        if (!user.refreshToken) {
            const refreshToken = this.createToken(payload, `${this.configService.get('JWT_REFRESH_TOKEN_SECRET')}-${user.email}-${user.password}`, null);
            user.refreshToken = refreshToken;
            await this.userRepository.save(user);
        }
        return {
            accessToken,
            refreshToken: user.refreshToken,
        };
    }
    async register(email, password, firstName, lastName) {
        const duplicate = await this.userRepository.findOne({
            where: { email: email },
        });
        if (duplicate) {
            throw new common_1.HttpException('Email already taken', common_1.HttpStatus.CONFLICT);
        }
        if (password === undefined)
            password = '';
        const user = new user_model_1.UserModel();
        user.password = password;
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.activationKey = this.generateActivationKey();
        return await this.userRepository.save(user);
    }
    async getById(id) {
        return await this.userRepository.findOne(id);
    }
    async validateUser(payload) {
        return await this.getById(payload.id.toString());
    }
    async login(email, password) {
        if (password === '') {
            throw new common_1.HttpException('Empty password', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository
            .createQueryBuilder()
            .where('LOWER(email) = LOWER(:email)', { email })
            .getOne();
        if (!user) {
            return user;
        }
        if (ramda_1.not(user.isActive)) {
            throw new common_1.HttpException('Ops, the current user is not active. Please activate your account by clicking the activation link from your email.', common_1.HttpStatus.BAD_REQUEST);
        }
        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }
    async update(updateUser, userID) {
        const result = await this.userRepository.update(userID, { ...updateUser });
        if (!result) {
            return null;
        }
        const user = await this.getById(userID);
        user.isComplete = user.shouldBeCompleted();
        return await this.userRepository.save(user);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_model_1.UserModel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map