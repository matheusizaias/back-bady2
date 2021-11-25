"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const typeorm_1 = require("typeorm");
const AdminRespository_1 = require("../repositories/AdminRespository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminView_1 = __importDefault(require("../views/adminView"));
class AdminController {
    async authenticate(request, response) {
        const { email, password } = request.body;
        const adminRepository = (0, typeorm_1.getCustomRepository)(AdminRespository_1.AdminRepository);
        const admin = await adminRepository.findOne({ email });
        if (!admin) {
            response.status(400).json({
                erro: 'User not found',
            });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, admin.password);
        if (!isValidPassword) {
            return response.status(400).json({
                error: 'User not found',
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin.id }, process.env.SECRET, { expiresIn: '365d' });
        return response.status(200).json({
            token,
            admin
        });
    }
    async create(request, response) {
        const { name, email, password } = request.body;
        const adminRepository = (0, typeorm_1.getCustomRepository)(AdminRespository_1.AdminRepository);
        const adminAlreadyExists = await adminRepository.findOne({ email });
        if (adminAlreadyExists) {
            return response.status(400).json({
                error: 'Admin already exists',
            });
        }
        const admin = adminRepository.create({
            name, email, password
        });
        await adminRepository.save(admin);
        return response.status(200).json(admin);
    }
    async show(request, response) {
        const adminRepository = (0, typeorm_1.getCustomRepository)(AdminRespository_1.AdminRepository);
        const admin = await adminRepository.find();
        return response.json(adminView_1.default.renderMany(admin));
    }
}
exports.AdminController = AdminController;
