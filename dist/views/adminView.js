"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(admin) {
        return {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            password: admin.password,
        };
    },
    renderMany(admin) {
        return admin.map(admin => this.render(admin));
    }
};
