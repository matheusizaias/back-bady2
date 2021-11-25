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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Sales_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = void 0;
const typeorm_1 = require("typeorm");
const Administrator_1 = require("./Administrator");
const uuid_1 = require("uuid");
const Products_1 = __importDefault(require("./Products"));
let Sales = Sales_1 = class Sales {
    constructor() {
        if (!this.id_sale) {
            this.id_sale = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Sales.prototype, "id_sale", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Sales.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "costumer" }),
    __metadata("design:type", String)
], Sales.prototype, "costumer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sales.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Sales.prototype, "delivered", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sales.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Administrator_1.Admin, sales => Sales_1, { eager: true }),
    __metadata("design:type", Administrator_1.Admin)
], Sales.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => Products_1.default),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Sales.prototype, "products", void 0);
Sales = Sales_1 = __decorate([
    (0, typeorm_1.Entity)("sales"),
    __metadata("design:paramtypes", [])
], Sales);
exports.default = Sales;
exports.Sales = Sales;
