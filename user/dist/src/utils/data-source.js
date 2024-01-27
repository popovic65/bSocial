"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv").config();
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("config"));
const postgresConfig = config_1.default.get("postgresConfig");
console.log(postgresConfig);
exports.AppDataSource = new typeorm_1.DataSource(Object.assign(Object.assign({}, postgresConfig), { type: "postgres", synchronize: true, logging: false, entities: ["src/entities/**/*.entity{.ts,.js}"], migrations: ["src/migrations/**/*{.ts,.js}"], subscribers: ["src/subscribers/**/*{.ts,.js}"] }));
