import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationAdmSales1637878224942 implements MigrationInterface {
    name = 'RelationAdmSales1637878224942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "adminId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_14df41ad90010de4de26f35e9bf"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "id_sale"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "id_sale" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_14df41ad90010de4de26f35e9bf" PRIMARY KEY ("id_sale")`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "value" integer`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "delivered" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "admin_id"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "admin_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_de87485f6489f5d0995f5841952"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_bfe26a454b0256cad011c3155fa" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_bfe26a454b0256cad011c3155fa"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "admin_id"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "admin_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "delivered" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "value" money NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_14df41ad90010de4de26f35e9bf"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "id_sale"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "id_sale" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_14df41ad90010de4de26f35e9bf" PRIMARY KEY ("id_sale")`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "adminId"`);
    }

}
