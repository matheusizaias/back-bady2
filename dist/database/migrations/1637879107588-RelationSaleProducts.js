"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationSaleProducts1637879107588 = void 0;
class RelationSaleProducts1637879107588 {
    constructor() {
        this.name = 'RelationSaleProducts1637879107588';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "sales_products_product" ("salesIdSale" character varying NOT NULL, "productIdProduct" character varying NOT NULL, CONSTRAINT "PK_efd55612dfbb722441bc983572a" PRIMARY KEY ("salesIdSale", "productIdProduct"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c7a09ec9987cf239b1809f350" ON "sales_products_product" ("salesIdSale") `);
        await queryRunner.query(`CREATE INDEX "IDX_47b2b0bf9e66abee149a35da25" ON "sales_products_product" ("productIdProduct") `);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id_product"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id_product" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_c8e2cf92d09d65c583fad34341c" PRIMARY KEY ("id_product")`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_bfe26a454b0256cad011c3155fa"`);
        await queryRunner.query(`ALTER TABLE "sales_products_product" ADD CONSTRAINT "FK_0c7a09ec9987cf239b1809f3501" FOREIGN KEY ("salesIdSale") REFERENCES "sales"("id_sale") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sales_products_product" ADD CONSTRAINT "FK_47b2b0bf9e66abee149a35da25e" FOREIGN KEY ("productIdProduct") REFERENCES "product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sales_products_product" DROP CONSTRAINT "FK_47b2b0bf9e66abee149a35da25e"`);
        await queryRunner.query(`ALTER TABLE "sales_products_product" DROP CONSTRAINT "FK_0c7a09ec9987cf239b1809f3501"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id_product"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id_product" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_c8e2cf92d09d65c583fad34341c" PRIMARY KEY ("id_product")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47b2b0bf9e66abee149a35da25"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c7a09ec9987cf239b1809f350"`);
        await queryRunner.query(`DROP TABLE "sales_products_product"`);
    }
}
exports.RelationSaleProducts1637879107588 = RelationSaleProducts1637879107588;
