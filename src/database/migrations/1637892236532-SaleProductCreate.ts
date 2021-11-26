import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class SaleProductCreate1637892236532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "sale_products_product",
              columns: [
                {
                  name: "spId", 
                  type: "uuid",
                  isPrimary: true,
                  isUnique: true
                },
                {
                  name: "qtd",
                  type: "int"
                },
                {
                  name: "price",
                  type: "money"
                },
                {
                    name: "total",
                    type: "money"
                },
                {
                  name: "salesIdSale",
                  type: "uuid",
                },
                {
                  name: "productIdProduct",
                  type: "uuid"
                }
              ]
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sale_products_product");
    }


}
