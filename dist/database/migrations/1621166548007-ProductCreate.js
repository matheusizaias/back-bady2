"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product1619148160847 = void 0;
const typeorm_1 = require("typeorm");
class Product1619148160847 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "product",
            columns: [
                {
                    name: "id_product",
                    type: "uuid",
                    isPrimary: true,
                    isUnique: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "price",
                    type: "money"
                },
                {
                    name: "amount",
                    type: "int",
                },
                {
                    name: "name_category",
                    type: "varchar"
                }
            ],
            foreignKeys: [
                {
                    name: "FKcategory",
                    referencedTableName: "category",
                    referencedColumnNames: ["category_name"],
                    columnNames: ["name_category"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("product");
    }
}
exports.Product1619148160847 = Product1619148160847;
