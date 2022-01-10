import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UserModel1639139955074 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
