"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUserSchema = void 0;
const zod_1 = require("zod");
exports.followUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        followedId: zod_1.z.number({ required_error: "Followed is required" }),
    }),
});
