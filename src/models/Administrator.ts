import bcrypt from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import Sales from "./Sales";

@Entity("admin")
export default class Admin {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Admin };
