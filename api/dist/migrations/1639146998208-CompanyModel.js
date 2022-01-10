"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel1639146998208 = void 0;
class CompanyModel1639146998208 {
    constructor() {
        this.name = 'CompanyModel1639146998208';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "companies_interests_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10')`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "company_name" character varying(255), "address" character varying(255), "description" text, "avatar_url" text, "thumbnail_url" text, "interests" "companies_interests_enum" array, "activation_key" character varying(255), "refresh_token" character varying(255), "is_active" boolean NOT NULL DEFAULT false, "is_complete" boolean DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TYPE "companies_interests_enum"`);
    }
}
exports.CompanyModel1639146998208 = CompanyModel1639146998208;
//# sourceMappingURL=1639146998208-CompanyModel.js.map