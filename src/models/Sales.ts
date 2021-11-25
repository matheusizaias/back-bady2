import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { Admin } from "./Administrator";
import { v4 as uuid } from "uuid";
import Product from "./Products";

@Entity("sales")
export default class Sales {
  @PrimaryColumn()
  readonly id_sale: string;

  @Column({ nullable: true })
  value: number;

  @Column({ name: "costumer" })
  costumer: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  delivered: boolean;

  @Column()
  admin_id: string;

  @ManyToOne(type => Admin, sales => Sales, {eager: true})
  admin: Admin;

  @ManyToMany(type => Product)
  @JoinTable()
  products:Product[]

  constructor() {
    if (!this.id_sale) {
      this.id_sale = uuid();
    }
  }
}

export { Sales };

