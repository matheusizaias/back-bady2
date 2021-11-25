"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categorie1619148174670 = void 0;
const typeorm_1 = require("typeorm");
class Categorie1619148174670 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "category",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "category_name",
                    type: "varchar",
                    isUnique: true
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("category");
    }
}
exports.Categorie1619148174670 = Categorie1619148174670;
