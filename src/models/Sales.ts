import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { Admin } from "./Administrator";
import { v4 as uuid } from "uuid";

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
  @JoinColumn({name: "admin_id",
  referencedColumnName: "id"}
  )
  admin: Admin;

  constructor() {
    if (!this.id_sale) {
      this.id_sale = uuid();
    }
  }
}

export { Sales };

