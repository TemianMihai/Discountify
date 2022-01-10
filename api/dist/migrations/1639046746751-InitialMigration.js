"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1639046746751 = void 0;
class InitialMigration1639046746751 {
    constructor() {
        this.name = 'InitialMigration1639046746751';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(255), "last_name" character varying(255), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "activation_key" character varying(255), "refresh_token" character varying(255), "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.InitialMigration1639046746751 = InitialMigration1639046746751;
//# sourceMappingURL=1639046746751-InitialMigration.js.map