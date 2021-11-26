import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import Product from "./Products";

@Entity("category")
export default class Category {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  category_name: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category };
