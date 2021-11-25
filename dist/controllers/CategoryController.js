"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const typeorm_1 = require("typeorm");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const categoryView_1 = __importDefault(require("../views/categoryView"));
class CategoryController {
    async create(request, response) {
        const category_name = request.body;
        const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
        const categoryExists = await categoryRepository.findOne(category_name);
        if (categoryExists) {
            return response.status(200).json({
                error: "Categoryalready exists"
            });
        }
        const category = categoryRepository.create(category_name);
        await categoryRepository.save(category);
        return response.json(category);
    }
    async show(request, response) {
        const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
        const category = await categoryRepository.find();
        return response.json(categoryView_1.default.renderMany(category));
    }
    async update(request, response) {
        const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
        const category = await categoryRepository.findOne(request.params.id);
        if (category) {
            (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository).merge(category, request.body);
            const result = await (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository).save(category);
            return response.json(categoryView_1.default.render(result));
        }
        return response.status(400).json({
            error: "Category doesn't exists"
        });
    }
    async delete(request, response) {
        const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
        const category = await categoryRepository.findOne(request.params.id);
        if (category) {
            const result = await (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository).delete(category);
            return response.json([
                result,
                {
                    message: "The category was excluded",
                    category: categoryView_1.default.render(category)
                },
            ]);
        }
        return response.status(400).json({
            error: "Cannot delete category"
        });
    }
}
exports.CategoryController = CategoryController;
