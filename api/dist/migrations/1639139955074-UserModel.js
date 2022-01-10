"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel1639139955074 = void 0;
class UserModel1639139955074 {
    constructor() {
        this.name = 'UserModel1639139955074';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "story" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar_url" text`);
        await queryRunner.query(`CREATE TYPE "users_interests_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "interests" "users_interests_enum" array`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_complete" boolean DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_complete"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "interests"`);
        await queryRunner.query(`DROP TYPE "users_interests_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_url"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "story"`);
    }
}
exports.UserModel1639139955074 = UserModel1639139955074;
//# sourceMappingURL=1639139955074-UserModel.js.map