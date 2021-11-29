import { Request, Response } from 'express';
import { Connection, getConnection, getCustomRepository } from 'typeorm';
import Product from '../models/Products';
import Sales from '../models/Sales';
import { AdminRepository } from '../repositories/AdminRespository';
import { SaleProductRepository } from '../repositories/SaleProductRepository';
import { SaleRepository } from '../repositories/SaleRepository';
import saleView from '../views/saleView';
import { SaleProductController } from './SaleProductController';

interface SaleProps {
  id_sale: string;
  admin_id: string;
  value: string;
  costumer: string;
  amount: number;
  product: Product[]
}


class SaleController {
  /**
   * Method to create a sale
   */
  async create(request: Request, response: Response) {
    const { admin_id, costumer, product} = request.body as SaleProps

    const [saleRepository, adminRepository, saleProductRepository] = await Promise.all([
      getCustomRepository(SaleRepository),
      getCustomRepository(AdminRepository),
      getCustomRepository(SaleProductRepository)
    ])

    const spController = new SaleProductController();

    const adminAlreadyExists = await adminRepository.findOne({ id: admin_id });

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {

      let value = 0;

      for(const p of product)
      {
        value+= parseFloat(p.price.toString()) * p.amount;
      }
      
      if (!adminAlreadyExists) {
        return response.status(400).json({
          error: 'User not found',
        });
      }

      const sale = saleRepository.create({
        costumer,
        admin_id: adminAlreadyExists.id,
        value: value
      });

      await saleRepository.save(sale);

      const id_sale = await connection.createQueryBuilder().select('id_sale').from(Sales, 'sales')
      .orderBy("sales.id_sale", "DESC").getOne();


      for(const p of product)
      {
        await spController.create(p, id_sale);
      }

      await queryRunner.commitTransaction();
      

      return response.status(200).json(sale);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      return response.status(400).json(error.message)
    }
  }

  /**
   * Method to show all the sales
   */

  async show(request: Request, response: Response) {
    const salesRepository = getCustomRepository(SaleRepository);
    const sales = await salesRepository.find();

    return response.json(saleView.renderMany(sales));
  }

  async showSaleByTime(requst: Request, response: Response) {
    const saleRepository = getCustomRepository(SaleRepository);
    const sales = await saleRepository.find({
      order: {
        created_at: "DESC",
      }
    })

    return response.status(200).json(sales);
  }

  /**
   * Method to delete a sale 
   */

  async delete(request: Request, response: Response) {
    const saleRepository = await getCustomRepository(SaleRepository)
    const sale = await saleRepository.findOne(request.params.id);

    if (sale) {
      const result = await getCustomRepository(SaleRepository).delete(sale.id_sale);
      return response.json(result);
    }
    return response.status(200).json({
      error: "Sale not found"
    });
  }

  /**
   * Method to set sale delivered
   */

  async setDelivered(request: Request, response: Response) {

    const saleRepository = await getCustomRepository(SaleRepository);
    const sale = await saleRepository.findOne(request.params.id);

    if (sale) {
      sale.delivered = true;
      const result = await getCustomRepository(SaleRepository).save(sale);
      return response.json(result);
    }
  }

  /**
   * Method to count the sales delivered
   */

  async countDeliverdeSales(request: Request, response: Response) {
    const saleRepository = await getCustomRepository(SaleRepository);
    const sale = await saleRepository.findAndCount({
      delivered: true
    });

    if (sale[1] == 0 || sale[0] == null) {
      return response.status(200).json({
        error: "There is no sale delivered"
      });
    }
    return response.json(sale);
  }
  async showSaleByCostumer(request: Request, response: Response) {
    const saleRepository = await getCustomRepository(SaleRepository);
    const sales = await saleRepository.find({
      where: {
        costumer: request.params.costumer
      }
    })
    if (!sales) {
      return response.status(400).json({
        error: "Costumer deost'n exists"
      })
    }

    return response.status(200).json(saleView.renderMany(sales))
  }
}

export { SaleController };

