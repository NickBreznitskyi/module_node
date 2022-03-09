"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const api_router_1 = require("./router/api.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(api_router_1.apiRouter);
const { PORT } = process.env;
app.listen(PORT, async () => {
    console.log(`Server has started on port ${PORT}!!!`);
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('DB connected');
        }
    }
    catch (e) {
        console.log(e.message);
    }
});
//# sourceMappingURL=app.js.map