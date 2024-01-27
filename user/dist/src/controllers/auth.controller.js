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
exports.loginUserHandler = exports.registerUserHandler = void 0;
const user_service_1 = require("../services/user.service");
const appError_1 = __importDefault(require("../utils/appError"));
const user_entity_1 = require("../entities/user.entity");
const registerUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, password } = req.body;
        const user = yield (0, user_service_1.createUser)({
            firstName,
            lastName,
            username,
            password,
        });
        res.status(201).json({
            status: "success",
            user,
        });
    }
    catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({
                status: "fail",
                message: "User with that username already exist!",
            });
        }
        next(err);
    }
});
exports.registerUserHandler = registerUserHandler;
const loginUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, user_service_1.findUserBy)({ username });
        if (!user || !(yield user_entity_1.User.comparePasswords(password, user.password))) {
            return next(new appError_1.default(400, "Invalid email or password"));
        }
        const following = user.following.map((e) => e.id);
        const data = { userId: user.id, username, following };
        res.status(200).json({
            status: "success",
            data,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.loginUserHandler = loginUserHandler;
