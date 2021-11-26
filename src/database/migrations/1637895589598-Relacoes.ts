import {MigrationInterface, QueryRunner} from "typeorm";

export class Relacoes1637895589598 implements MigrationInterface {
    name = 'Relacoes1637895589598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales_products_product" ("spId" character varying NOT NULL, "qtd" integer NOT NULL, "price" money NOT NULL, "total" money NOT NULL, "salesIdSale" character varying NOT NULL, "productIdProduct" character varying NOT NULL, CONSTRAINT "PK_46d2d95e2f77ff6a58ef157b710" PRIMARY KEY ("spId"))`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_de87485f6489f5d0995f5841952"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9359e3b1d5e90d7a0fbe3b28077"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_6f1268454ae4a2a833f1710b20a" PRIMARY KEY ("category_name", "id")`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_6f1268454ae4a2a833f1710b20a"`);
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
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "delivered" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "delivered" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_6a93914311a5410bd9d2952b18a" FOREIGN KEY ("name_category") REFERENCES "category"("category_name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_46c3943aede2fed7d7c9426829c" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales_products_product" ADD CONSTRAINT "FK_0c7a09ec9987cf239b1809f3501" FOREIGN KEY ("salesIdSale") REFERENCES "sales"("id_sale") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales_products_product" ADD CONSTRAINT "FK_47b2b0bf9e66abee149a35da25e" FOREIGN KEY ("productIdProduct") REFERENCES "product"("id_product") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_products_product" DROP CONSTRAINT "FK_47b2b0bf9e66abee149a35da25e"`);
        await queryRunner.query(`ALTER TABLE "sales_products_product" DROP CONSTRAINT "FK_0c7a09ec9987cf239b1809f3501"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_46c3943aede2fed7d7c9426829c"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_6a93914311a5410bd9d2952b18a"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "delivered" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "delivered" DROP NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_9359e3b1d5e90d7a0fbe3b28077" UNIQUE ("category_name")`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_6f1268454ae4a2a833f1710b20a" PRIMARY KEY ("category_name", "id")`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_6f1268454ae4a2a833f1710b20a"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9359e3b1d5e90d7a0fbe3b28077" PRIMARY KEY ("category_name")`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email")`);
        await queryRunner.query(`DROP TABLE "sales_products_product"`);
    }

}
