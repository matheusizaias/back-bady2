"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Product_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const Categories_1 = require("./Categories");
const uuid_1 = require("uuid");
let Product = Product_1 = class Product {
    constructor() {
        if (!this.id_product) {
            this.id_product = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Product.prototype, "id_product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name_category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Categories_1.Category, products => Product_1, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "name_category",
        referencedColumnName: "category_name" }),
    __metadata("design:type", Categories_1.Category)
], Product.prototype, "category", void 0);
Product = Product_1 = __decorate([
    (0, typeorm_1.Entity)("product"),
    __metadata("design:paramtypes", [])
], Product);
exports.default = Product;
exports.Product = Product;
