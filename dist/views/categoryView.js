"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(category) {
        return {
            id: category.id,
            category_name: category.category_name
        };
    },
    renderMany(category) {
        return category.map(category => this.render(category));
    }
};
