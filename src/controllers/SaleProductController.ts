import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
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

// type Product = {
//   id_product: string;
//   amount: number;
//   price: number
// }

class SaleProductController {
  /**
   * Method to create a sale
   */
  async create(request: Request, response: Response) {
    const { id_sale, id_product, qtd, price} = request.body as SaleProduct

    const [saleRepository, productRepository, saleProductRepository] = await Promise.all([
      getCustomRepository(SaleRepository),
      getCustomRepository(ProductRepository),
      getCustomRepository(SaleProductRepository)
    ])

    let total = 0

    try {


      const product = await productRepository.findOne({id_product: id_product});

      const sale = await saleRepository.findOne({id_sale: id_sale});
      
      if(!sale)
      {
        throw new Error("Sale doesn't exists");
      }else if (!product) {
        throw new Error("Product doesn't exists");

      } else if (qtd > product.amount) {
        throw new Error("Amount greater than stock");
      }else{
        product.amount = product.amount - qtd
        productRepository.save({ ...product });     
      }

      total = price * qtd;

      const saleProduct = await saleProductRepository.create({
        salesIdSale: id_sale,
        productIdProduct: id_product,
        qtd: qtd,
        price: price,
        total: total
      });

      await saleProductRepository.save(saleProduct);

      return response.status(200).json(saleProduct);

    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  

  async show(request: Request, response: Response) {
    const salesRepository = getCustomRepository(SaleRepository);
    const sales = await salesRepository.find();

    return response.json(saleView.renderMany(sales));
  }

  
}
 

export { SaleProductController };

