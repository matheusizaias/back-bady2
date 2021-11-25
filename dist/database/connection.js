"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
try {
    (0, typeorm_1.createConnection)().then(() => console.log("Conncected Database!"));
}
catch (error) {
    console.log(error);
}
