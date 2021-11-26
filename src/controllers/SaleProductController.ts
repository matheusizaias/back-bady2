import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AdminRepository } from '../repositories/AdminRespository';
import { ProductRepository } from '../repositories/ProductRepository';
import { SaleRepository } from '../repositories/SaleRepository';
import saleView from '../views/saleView';

interface SaleProps {
  id_sale: string;
  admin_id: string;
  value: string;
  costumer: string;
  products: Product[]
  amount: number
}

type Product = {
  id_product: string;
  amount: number;
  price: number
}

class SaleProductController {
  /**
   * Method to create a sale
   */
  async create(request: Request, response: Response) {
    const { id_sale, products, amount} = request.body as SaleProps

    const [saleRepository, adminRepository, productRepository, /**saleProductRepository*/] = await Promise.all([
      getCustomRepository(SaleRepository),
      getCustomRepository(AdminRepository),
      getCustomRepository(ProductRepository),
      // getCustomRepository(SaleProductRepository)
    ])

    // const adminAlreadyExists = await adminRepository.findOne({ id: admin_id });
    let value = 0

    try {
      for (const p of products) {
        const product = await productRepository.findOne(p.id_product) as Product
        value += parseFloat(p.price.toString()) * p.amount

        
          if (!product) {
            throw new Error("Product doesn't exists");
  
          } else if (p.amount > product.amount) {
            throw new Error("Amount greater than stock");
          }else{
            product.amount = product.amount - p.amount
            productRepository.save({ ...product });     
          }

      }

      // if (!adminAlreadyExists) {
      //   return response.status(400).json({
      //     error: 'User not found',
      //   });
      // }

      // const sale = saleRepository.create({
      //   value,
      //   admin_id: adminAlreadyExists.id
      // });

     

      // await saleRepository.save(sale);


      // return response.status(200).json(sale);

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

