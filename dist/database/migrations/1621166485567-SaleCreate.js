"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesCreate1618948291183 = void 0;
const typeorm_1 = require("typeorm");
class SalesCreate1618948291183 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "sales",
            columns: [
                {
                    name: "id_sale",
                    type: "uuid",
                    isPrimary: true,
                    isUnique: true
                },
                {
                    name: "value",
                    type: "money"
                },
                {
                    name: "costumer",
                    type: "varchar"
                },
                {
                    name: "delivered",
                    type: "boolean",
                    default: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "admin_id",
                    type: "uuid"
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("sales");
    }
}
exports.SalesCreate1618948291183 = SalesCreate1618948291183;
