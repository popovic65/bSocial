"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const morgan_1 = __importDefault(require("morgan"));
const data_source_1 = require("./utils/data-source");
const appError_1 = __importDefault(require("./utils/appError"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const kafka_1 = require("./utils/kafka");
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Database connected successfully");
    (0, validateEnv_1.default)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json({ limit: "10kb" }));
    if (process.env.NODE_ENV === "development")
        app.use((0, morgan_1.default)("dev"));
    app.use("/auth", auth_routes_1.default);
    app.use("/api/users", user_routes_1.default);
    app.get("/api/healthChecker", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(200).json({
            status: "success",
        });
    }));
    app.all("*", (req, res, next) => {
        next(new appError_1.default(404, `Route ${req.originalUrl} not found`));
    });
    app.use((error, req, res, next) => {
        error.status = error.status || "error";
        error.statusCode = error.statusCode || 500;
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    });
    (0, kafka_1.connectProducer)();
    const port = config_1.default.get("port");
    app.listen(port, () => {
        console.log(`User-service started on port: ${port}`);
    });
}))
    .catch((error) => console.log(error));
