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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const users_decorator_1 = require("./users.decorator");
const gqlauthguard_1 = require("./gqlauthguard");
const user_model_1 = require("./models/user.model");
const users_service_1 = require("./users.service");
const registration_user_input_1 = require("./input/registration.user.input");
const tokens_input_1 = require("./input/tokens.input");
const activate_input_1 = require("./input/activate.input");
const login_input_1 = require("./input/login.input");
const update_user_input_1 = require("./input/update.user.input");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async registerUser(registerData) {
        const user = await this.usersService.register(registerData.email, registerData.password, registerData.firstName, registerData.lastName);
        if (!user) {
            throw new common_1.HttpException('Error registering user. Try again!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return user;
    }
    async activateUser(ctx, activateData) {
        const user = await this.usersService.activate(activateData.activationKey);
        if (!user) {
            throw new common_1.HttpException('Invalid activation email link. Please contact us via email.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const { accessToken, refreshToken } = await this.usersService.generateTokens(user);
        ctx['res'].cookie('RefreshToken', refreshToken, { httpOnly: true });
        return {
            accessToken,
        };
    }
    async loginUser(ctx, loginData) {
        const user = await this.usersService.login(loginData.email, loginData.password);
        if (!user) {
            throw new common_1.HttpException('Incorrect email or password. Try again!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const { accessToken, refreshToken } = await this.usersService.generateTokens(user);
        ctx['res'].cookie('RefreshToken', refreshToken, { httpOnly: true });
        return {
            accessToken,
        };
    }
    async updateUser(user, updateData) {
        return await this.usersService.update(updateData, user.id);
    }
    async getUser(user, id) {
        return await this.usersService.getById(id);
    }
};
__decorate([
    graphql_1.Mutation((returns) => user_model_1.UserModel, { name: 'registerUser', nullable: true }),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_user_input_1.RegistrationUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "registerUser", null);
__decorate([
    graphql_1.Mutation((returns) => tokens_input_1.Tokens, { name: 'activateUser', nullable: true }),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, activate_input_1.ActivateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "activateUser", null);
__decorate([
    graphql_1.Mutation((returns) => tokens_input_1.Tokens, { name: 'loginUser', nullable: true }),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "loginUser", null);
__decorate([
    common_1.UseGuards(gqlauthguard_1.GqlAuthGuard),
    graphql_1.Mutation((returns) => user_model_1.UserModel, { name: 'updateUser', nullable: true }),
    __param(0, users_decorator_1.User()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    common_1.UseGuards(gqlauthguard_1.GqlAuthGuard),
    graphql_1.Query((returns) => user_model_1.UserModel),
    __param(0, users_decorator_1.User()),
    __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUser", null);
UsersResolver = __decorate([
    graphql_1.Resolver((of) => user_model_1.UserModel),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map