import { Request, Response } from "express";
import { Equal, getConnection, getCustomRepository, IsNull, Not } from "typeorm";
import Products from "../models/Products";
import Sales from "../models/Sales";
import SalesProduct from "../models/SalesProduct";
import { ProductRepository } from "../repositories/ProductRepository";
import { SaleProductRepository } from "../repositories/SaleProductRepository";
import { SaleRepository } from "../repositories/SaleRepository";
import productView from "../views/productView";
import saleProductView from "../views/saleProductView";

interface SaleProduct {
  id_sale: string;
  id_product: string;
  qtd: number;
  price: number;
  total: number;
}

type Product = {
  id: string;
  amount: number;
  price: number;
};

class SaleProductController {
  /**
   * Method to create a sale
   */
  async create(p: Product, id_sale: Sales) {
    //const { id_sale, id_product, qtd, price} = request.body as SaleProduct

    const [saleRepository, productRepository, saleProductRepository] =
      await Promise.all([
        getCustomRepository(SaleRepository),
        getCustomRepository(ProductRepository),
        getCustomRepository(SaleProductRepository),
      ]);

    try {
      const product = await productRepository.findOne({ id_product: p.id });

      const sale = await saleRepository.findOne({ id_sale: id_sale.id_sale });

      if (!sale) {
        throw new Error("Sale doesn't exists");
      } else if (!product) {
        throw new Error("Product doesn't exists");
      } else if (p.amount > product.amount) {
        throw new Error("Amount greater than stock");
      } else {
        product.amount = product.amount - p.amount;
        productRepository.save({ ...product });
      }

      const saleProduct = saleProductRepository.create({
        salesIdSale: id_sale.id_sale,
        productIdProduct: p.id,
        qtd: p.amount,
        price: p.price / p.amount,
        total: p.price,
      });

      await saleProductRepository.save(saleProduct);

      //await queryRunner.commitTransaction();

      // return response.status(200).json(saleProduct);
    } catch (error) {
      //await queryRunner.rollbackTransaction();
      throw new Error("Erro no Sale Product" + error.message);
    }
  }

  async show(request: Request, response: Response) {
    const saleProductRepository = getCustomRepository(SaleProductRepository);
    const salesProduct = await saleProductRepository.find();

    // const produto = this.showProductName(salesProduct)

    return response.json(saleProductView.renderMany(salesProduct));
  }

  async showRelatory(request: Request, response: Response) {
    const [saleProductRepository] =
      await Promise.all([
        getCustomRepository(SaleProductRepository),
      ]);

    const salesProduct = await saleProductRepository.find(
      {
        order: {qtd: "DESC"}
      }
    );

    const aux = await saleProductRepository.find();

    

    for (let i = 0;  i < salesProduct.length; i++) {

      for(let j = 0; j < salesProduct.length; j++)
      {
        if(salesProduct[i].productIdProduct == aux[j].productIdProduct && salesProduct[i].salesIdSale != aux[j].salesIdSale)
        {
          salesProduct[i].qtd += aux[j].qtd;
        }
      }
    }

    return response.status(200).json(saleProductView.renderMany(salesProduct));
  }
}

export { SaleProductController };
