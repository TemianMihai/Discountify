"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const terminus_1 = require("@nestjs/terminus");
const schedule_1 = require("@nestjs/schedule");
const core_1 = require("@nestjs/core");
const nestjs_admin_1 = require("nestjs-admin");
const nest_raven_1 = require("nest-raven");
const users_module_1 = require("./users/users.module");
const common_module_1 = require("./common/common.module");
const health_module_1 = require("./health/health.module");
const health_controller_1 = require("./health/health.controller");
const constants_1 = require("./constants");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            terminus_1.TerminusModule,
            common_module_1.CommonModule,
            nest_raven_1.RavenModule,
            users_module_1.UsersModule,
            health_module_1.HealthModule,
            nestjs_admin_1.DefaultAdminModule,
            schedule_1.ScheduleModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                cors: {
                    origin: [
                        "http://localhost:8080",
                        "http://localhost:3000",
                    ],
                    credentials: true,
                    allowedHeaders: ["Set-Cookie"],
                    exposedHeaders: ["Set-Cookie"]
                },
                autoSchemaFile: path_1.join(process.cwd(), "src/schema.gql"),
                buildSchemaOptions: {
                    numberScalarMode: "integer",
                    dateScalarMode: "timestamp"
                },
                installSubscriptionHandlers: true,
                subscriptions: {
                    keepAlive: 3002
                },
                directiveResolvers: {
                    MutationStatus: constants_1.allowedMutationStatus,
                    Onboarding: constants_1.allowedOnboarding,
                    OnboardingCompany: constants_1.allowedOnboardingCompany
                },
                context: async ({ req, connection, res }) => {
                    if (connection) {
                        return {
                            req: {
                                headers: {
                                    authorization: connection.context.authorization
                                }
                            },
                            res: connection.context
                        };
                    }
                    return { req, res };
                },
                sortSchema: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    logging: configService.get("DEBUG", "false") === "true",
                    type: "postgres",
                    host: configService.get("DB_HOST"),
                    port: configService.get("DB_PORT"),
                    username: configService.get("DB_USER"),
                    password: configService.get("DB_PASSWORD"),
                    database: configService.get("DB_NAME"),
                    extra: configService.get("DB_USE_SSL", "false") === "true" ? { ssl: { rejectUnauthorized: false } } : {},
                    entities: ["**/*.model.js", nestjs_admin_1.AdminUserEntity],
                    migrations: ["dist/migrations/*.js"],
                    migrationsRun: configService.get("DB_RUN_MIGRATIONS", "true") === "true",
                    synchronize: false,
                    bigNumberStrings: false,
                    dropSchema: false,
                }),
                inject: [config_1.ConfigService]
            }),
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useValue: new nest_raven_1.RavenInterceptor({
                    filters: [{ type: common_1.HttpException, filter: (exception) => exception.getStatus() < 500 }]
                })
            }
        ],
        controllers: [health_controller_1.HealthController]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map