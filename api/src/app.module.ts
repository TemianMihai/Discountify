import { join } from "path";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { HttpException, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TerminusModule } from "@nestjs/terminus";
import { ScheduleModule } from "@nestjs/schedule";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { DefaultAdminModule, AdminUserEntity } from "nestjs-admin";
import { RavenInterceptor, RavenModule } from "nest-raven";

import { UsersModule } from "./users/users.module";
import { CommonModule } from "./common/common.module";
import { HealthModule } from "./health/health.module";

import { HealthController } from "./health/health.controller";

import { allowedMutationStatus, allowedOnboarding, allowedOnboardingCompany } from './constants'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TerminusModule,
    CommonModule,
    RavenModule,
    UsersModule,
    HealthModule,
    DefaultAdminModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      cors: {
        origin: [
          "http://localhost:8080",
          "http://localhost:3000",
        ],
        credentials: true,
        allowedHeaders: ["Set-Cookie"],
        exposedHeaders: ["Set-Cookie"]
      },
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: {
        numberScalarMode: "integer",
        dateScalarMode: "timestamp"
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 3002
      },
      directiveResolvers: {
        MutationStatus: allowedMutationStatus,
        Onboarding: allowedOnboarding,
        OnboardingCompany: allowedOnboardingCompany
      },
      context: async ({ req, connection, res }) => {
        // subscriptions
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
        // queries and mutations
        return { req, res };
      },
      sortSchema: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        logging: configService.get("DEBUG", "false") === "true",
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        extra: configService.get("DB_USE_SSL", "false") === "true" ? { ssl: { rejectUnauthorized: false } } : {},
        entities: ["**/*.model.js", AdminUserEntity],
        migrations: ["dist/migrations/*.js"],
        migrationsRun: configService.get("DB_RUN_MIGRATIONS", "true") === "true",
        synchronize: false,
        bigNumberStrings: false,
        dropSchema: false,
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [{ type: HttpException, filter: (exception: HttpException) => exception.getStatus() < 500 }]
      })
    }
  ],
  controllers: [HealthController]
})
export class AppModule {}
