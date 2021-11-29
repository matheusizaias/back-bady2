import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
  } from "typeorm";
import Product from "./Products";
import Sales from "./Sales";
import { v4 as uuid } from "uuid";

  
  @Entity("sales_products_product")
  export default class SalesProduct {
    @PrimaryColumn()
    readonly spId: string;
  
    @Column()
    qtd: number;
  
    @Column()
    price: number;
  
    @Column()
    total: number;

    @Column()
    salesIdSale: string

    @Column()
    productIdProduct: string

    @ManyToOne(type => Sales, sps => SalesProduct)
    @JoinColumn({name: "salesIdSale",
    referencedColumnName: "id_sale"}
    )
    sale:Sales;

    @ManyToOne(type => Product, sps => SalesProduct)
    @JoinColumn({name: "productIdProduct",
    referencedColumnName: "id_product"}
    )
    product:Product;

    constructor() {
      if (!this.spId) {
        this.spId = uuid();
      }
    }

  }
  
  export { SalesProduct };
  
  