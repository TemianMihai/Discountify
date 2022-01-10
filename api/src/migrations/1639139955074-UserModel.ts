import {MigrationInterface, QueryRunner} from "typeorm";

export class UserModel1639139955074 implements MigrationInterface {
    name = 'UserModel1639139955074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "story" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar_url" text`);
        await queryRunner.query(`CREATE TYPE "users_interests_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "interests" "users_interests_enum" array`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_complete" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_complete"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "interests"`);
        await queryRunner.query(`DROP TYPE "users_interests_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_url"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "story"`);
    }

}
