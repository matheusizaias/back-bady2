"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorCreate1618946759810 = void 0;
const typeorm_1 = require("typeorm");
class AdministratorCreate1618946759810 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "admin",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar"
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("admin");
    }
}
exports.AdministratorCreate1618946759810 = AdministratorCreate1618946759810;
