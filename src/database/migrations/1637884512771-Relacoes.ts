import {MigrationInterface, QueryRunner} from "typeorm";

export class Relacoes1637884512771 implements MigrationInterface {
    name = 'Relacoes1637884512771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales_products_product" ("salesIdSale" character varying NOT NULL, "productIdProduct" character varying NOT NULL, CONSTRAINT "PK_efd55612dfbb722441bc983572a" PRIMARY KEY ("salesIdSale", "productIdProduct"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c7a09ec9987cf239b1809f350" ON "sales_products_product" ("salesIdSale") `);
        await queryRunner.query(`CREATE INDEX "IDX_47b2b0bf9e66abee149a35da25" ON "sales_products_product" ("productIdProduct") `);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_c8e2cf92d09d65c583fad34341c"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id_product"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id_product" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_c8e2cf92d09d65c583fad34341c" PRIMARY KEY ("id_product")`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_14df41ad90010de4de26f35e9bf"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "id_sale"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "id_sale" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_14df41ad90010de4de26f35e9bf" PRIMARY KEY ("id_sale")`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "value" integer`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "delivered" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_de87485f6489f5d0995f5841952"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_6a93914311a5410bd9d2952b18a" FOREIGN KEY ("name_category") REFERENCES "category"("category_name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_46c3943aede2fed7d7c9426829c" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales_products_product" ADD CONSTRAINT "FK_0c7a09ec9987cf239b1809f3501" FOREIGN KEY ("salesIdSale") REFERENCES "sales"("id_sale") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sales_products_product" ADD CONSTRAINT "FK_47b2b0bf9e66abee149a35da25e" FOREIGN KEY ("productIdProduct") REFERENCES "product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_products_product" DROP CONSTRAINT "FK_47b2b0bf9e66abee149a35da25e"`);
        await queryRunner.query(`ALTER TABLE "sales_products_product" DROP CONSTRAINT "FK_0c7a09ec9987cf239b1809f3501"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_46c3943aede2fed7d7c9426829c"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_6a93914311a5410bd9d2952b18a"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "delivered" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "value" money NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_14df41ad90010de4de26f35e9bf"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "id_sale"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "id_sale" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_14df41ad90010de4de26f35e9bf" PRIMARY KEY ("id_sale")`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" money NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_c8e2cf92d09d65c583fad34341c"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id_product"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id_product" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_c8e2cf92d09d65c583fad34341c" PRIMARY KEY ("id_product")`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47b2b0bf9e66abee149a35da25"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c7a09ec9987cf239b1809f350"`);
        await queryRunner.query(`DROP TABLE "sales_products_product"`);
    }

}
