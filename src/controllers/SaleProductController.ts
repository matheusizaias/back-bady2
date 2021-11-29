import { Request, Response } from 'express';
import { getConnection, getCustomRepository } from 'typeorm';
import Sales from '../models/Sales';
import { ProductRepository } from '../repositories/ProductRepository';
import { SaleProductRepository } from '../repositories/SaleProductRepository';
import { SaleRepository } from '../repositories/SaleRepository';
import saleView from '../views/saleView';

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
  price: number
}

class SaleProductController {
  /**
   * Method to create a sale
   */
  async create(p: Product, id_sale: Sales) {
    //const { id_sale, id_product, qtd, price} = request.body as SaleProduct

    const [saleRepository, productRepository, saleProductRepository] = await Promise.all([
      getCustomRepository(SaleRepository),
      getCustomRepository(ProductRepository),
      getCustomRepository(SaleProductRepository)
    ])

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    let total = 0

    try {


      const product = await productRepository.findOne({id_product: p.id});

      const sale = await saleRepository.findOne({id_sale: id_sale.id_sale});
      
      if(!sale)
      {
        await queryRunner.rollbackTransaction();
        throw new Error("Sale doesn't exists");
      }else if (!product) {
        await queryRunner.rollbackTransaction();
        throw new Error("Product doesn't exists");
      } else if (p.amount > product.amount) {
        await queryRunner.rollbackTransaction();
        throw new Error("Amount greater than stock");
      }else{
        product.amount = product.amount - p.amount
        productRepository.save({ ...product });     
      }

      total = p.price * p.amount;

      const saleProduct = saleProductRepository.create({
        salesIdSale: id_sale.id_sale,
        productIdProduct: p.id,
        qtd: p.amount,
        price: p.price,
        total: total
      });

      await saleProductRepository.save(saleProduct);

      //await queryRunner.commitTransaction();

      // return response.status(200).json(saleProduct);

    } catch (error) {
      //await queryRunner.rollbackTransaction();
      throw new Error("Erro no Sale Product" + error.message)
    }
  }

  

  async show(request: Request, response: Response) {
    const salesRepository = getCustomRepository(SaleRepository);
    const sales = await salesRepository.find();

    return response.json(saleView.renderMany(sales));
  }

  
}
 

export { SaleProductController };

