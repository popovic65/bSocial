"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: "First name is required",
        }),
        lastName: (0, zod_1.string)({
            required_error: "Last name is required",
        }),
        username: (0, zod_1.string)({
            required_error: "Username is required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        })
            .min(5, "Password must be more than 5 characters")
            .max(32, "Password must be less than 32 characters"),
        passwordConfirm: (0, zod_1.string)({
            required_error: "Please confirm your password",
        }),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "Passwords do not match",
    }),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: "Username is required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(5, "Invalid email or password"),
    }),
});
