"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const date_scalar_1 = require("../common/scalars/date.scalar");
const common_module_1 = require("../common/common.module");
const basic_strategy_1 = require("./basic.strategy");
const jwt_strategy_1 = require("./jwt.strategy");
const user_model_1 = require("./models/user.model");
const company_model_1 = require("./models/company.model");
const users_resolver_1 = require("./users.resolver");
const company_resolver_1 = require("./company.resolver");
const company_service_1 = require("./company.service");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_model_1.UserModel]),
            typeorm_1.TypeOrmModule.forFeature([company_model_1.CompanyModel]),
            common_module_1.CommonModule,
            config_1.ConfigModule,
        ],
        providers: [
            users_resolver_1.UsersResolver,
            config_1.ConfigService,
            users_service_1.UsersService,
            company_resolver_1.CompanyResolver,
            company_service_1.CompanyService,
            date_scalar_1.DateScalar,
            jwt_strategy_1.JwtStrategy,
            basic_strategy_1.BasicStrategy,
        ],
        exports: [users_service_1.UsersService, typeorm_1.TypeOrmModule.forFeature([user_model_1.UserModel])],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map