"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const typeorm_1 = require("typeorm");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const ProductRepository_1 = require("../repositories/ProductRepository");
const productView_1 = __importDefault(require("../views/productView"));
class ProductController {
    async create(request, response) {
        const { name, price, name_category, amount } = request.body;
        const [productReposiory, categoryReposiory] = await Promise.all([
            (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository),
            (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository)
        ]);
        const categoryExists = await categoryReposiory.findOne({ category_name: name_category });
        if (!categoryExists) {
            return response.status(400).json({
                error: "Category doesn't exists"
            });
        }
        const product = productReposiory.create({
            name,
            price,
            amount,
            name_category: categoryExists.category_name
        });
        await productReposiory.save(product);
        return response.json(product);
    }
    async show(request, response) {
        const productRepository = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const product = await productRepository.find();
        return response.json(productView_1.default.renderMany(product));
    }
    async update(request, response) {
        const productReposiory = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const product = await productReposiory.findOne(request.params.id);
        if (product) {
            (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository).merge(product, request.body);
            const result = await (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository).save(product);
            return response.json(productView_1.default.render(result));
        }
    }
    async index(request, response) {
        const productRepository = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const product = await productRepository.findOne(request.params.id);
        return response.json(productView_1.default.render(product));
    }
    async delete(request, response) {
        const productRepository = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const product = await productRepository.findOne(request.params.id);
        if (product) {
            const result = await (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository).delete(product);
            return response.json(result);
        }
    }
    async showProductByCategory(request, response) {
        const productReposiory = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const products = await productReposiory.find({
            where: {
                name_category: request.params.name_category
            }
        });
        if (products.length <= 0) {
            return response.status(400).json({
                error: "Product not found on this category"
            });
        }
        return response.json(productView_1.default.renderMany(products));
    }
}
exports.ProductController = ProductController;
