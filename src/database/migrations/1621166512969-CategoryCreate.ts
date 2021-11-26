import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Categorie1619148174670 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "category",
        columns: [
          {
            name: "id",
            type: "uuid"
          },
          {
            name: "category_name",
            type: "varchar",
            isPrimary: true,
            isUnique: true
            
          }
        ]
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("category");
  }
}
