"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(sales) {
        return {
            id: sales.id_sale,
            value: sales.value,
            costumer: sales.costumer,
            created_at: sales.created_at,
            admin_id: sales.admin_id
        };
    },
    renderMany(sales) {
        return sales.map(sales => this.render(sales));
    }
};
