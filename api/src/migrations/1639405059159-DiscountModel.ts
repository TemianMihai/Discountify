import {MigrationInterface, QueryRunner} from "typeorm";

export class DiscountModel1639405059159 implements MigrationInterface {
    name = 'DiscountModel1639405059159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "discounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, "initial_price" integer, "discount_percentage" text, "is_visible" boolean NOT NULL DEFAULT false, "company_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_66c522004212dc814d6e2f14ecc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "discounts" ADD CONSTRAINT "FK_2bb55b1d0e4dd71a00b1ce80e3d" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discounts" DROP CONSTRAINT "FK_2bb55b1d0e4dd71a00b1ce80e3d"`);
        await queryRunner.query(`DROP TABLE "discounts"`);
    }

}
