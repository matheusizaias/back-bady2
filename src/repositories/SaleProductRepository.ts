import { EntityRepository, Repository } from "typeorm";
import SalesProduct from "../models/SalesProduct";

@EntityRepository (SalesProduct)
class SaleProductRepository extends Repository<SalesProduct> {}

export { SaleProductRepository };
