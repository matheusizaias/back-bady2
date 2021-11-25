"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(product) {
        return {
            id: product.id_product,
            name: product.name,
            amount: product.amount,
            name_category: product.name_category,
            price: product.price
        };
    },
    renderMany(product) {
        return product.map(product => this.render(product));
    }
};
