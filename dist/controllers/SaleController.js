"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleController = void 0;
const typeorm_1 = require("typeorm");
const AdminRespository_1 = require("../repositories/AdminRespository");
const ProductRepository_1 = require("../repositories/ProductRepository");
const SaleRepository_1 = require("../repositories/SaleRepository");
const saleView_1 = __importDefault(require("../views/saleView"));
class SaleController {
    async create(request, response) {
        const { admin_id, costumer, id_product } = request.body;
        const [saleRepository, adminRepository, productRepository,] = await Promise.all([
            (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository),
            (0, typeorm_1.getCustomRepository)(AdminRespository_1.AdminRepository),
            (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository),
        ]);
        const adminAlreadyExists = await adminRepository.findOne({ id: admin_id });
        let value = 0;
        try {
            for (const p of id_product) {
                const product = await productRepository.findOne(p.id_product);
                value += parseFloat(p.price.toString());
                for (const p2 of id_product) {
                    if (!product) {
                        throw new Error("Product doesn't exists");
                    }
                    else if (p2.amount > product.amount) {
                        throw new Error("Amount greater than stock");
                    }
                }
                product.amount = product.amount - p.amount;
                productRepository.save(Object.assign({}, product));
            }
            if (!adminAlreadyExists) {
                return response.status(400).json({
                    error: 'User not found',
                });
            }
            const sale = saleRepository.create({
                value,
                costumer,
                admin_id: adminAlreadyExists.id,
            });
            await saleRepository.save(sale);
            return response.status(200).json(sale);
        }
        catch (error) {
            return response.status(400).json(error.message);
        }
    }
    async show(request, response) {
        const salesRepository = (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository);
        const sales = await salesRepository.find();
        return response.json(saleView_1.default.renderMany(sales));
    }
    async showSaleByTime(requst, response) {
        const saleRepository = (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository);
        const sales = await saleRepository.find({
            order: {
                created_at: "DESC",
            }
        });
        return response.status(200).json(sales);
    }
    async delete(request, response) {
        const saleRepository = await (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository);
        const sale = await saleRepository.findOne(request.params.id);
        if (sale) {
            const result = await (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository).delete(sale.id_sale);
            return response.json(result);
        }
        return response.status(200).json({
            error: "Sale not found"
        });
    }
    async setDelivered(request, response) {
        const saleRepository = await (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository);
        const sale = await saleRepository.findOne(request.params.id);
        if (sale) {
            sale.delivered = true;
            const result = await (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository).save(sale);
            return response.json(result);
        }
    }
    async countDeliverdeSales(request, response) {
        const saleRepository = await (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository);
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
    async showSaleByCostumer(request, response) {
        const saleRepository = await (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository);
        const sales = await saleRepository.find({
            where: {
                costumer: request.params.costumer
            }
        });
        if (!sales) {
            return response.status(400).json({
                error: "Costumer deost'n exists"
            });
        }
        return response.status(200).json(saleView_1.default.renderMany(sales));
    }
}
exports.SaleController = SaleController;
