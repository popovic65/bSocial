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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowersController = exports.getFollowingController = exports.followUserController = exports.findUsersController = exports.findByUsernameController = exports.findUserController = exports.getUserHandler = void 0;
const user_service_1 = require("../services/user.service");
const getUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.user)
            return res.status(401).json({ message: "Not authenticated user" });
        const user = req.body.user;
        res.status(200).status(200).json({
            data: {
                user,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserHandler = getUserHandler;
const findUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const data = yield (0, user_service_1.findUserBy)({ userId });
        if (data) {
            return res.status(200).json({ data: data });
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.findUserController = findUserController;
const findByUsernameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        console;
        const data = yield (0, user_service_1.findUserBy)({ username });
        if (data) {
            return res.status(200).json(data);
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.findByUsernameController = findByUsernameController;
const findUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const data = yield (0, user_service_1.findUsers)(query);
        if (data) {
            return res.status(200).json(data);
        }
        else {
            return res.status(404).json({ message: "Users not found" });
        }
    }
    catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.findUsersController = findUsersController;
const followUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.user)
        return res.status(401).json({ message: "Not authenticated user" });
    const { followedId } = req.body;
    const { userId } = req.body.user;
    try {
        const success = yield (0, user_service_1.followUser)(userId, followedId);
        if (success) {
            res.status(200).send({ message: "User followed successfully" });
        }
        else {
            res
                .status(400)
                .send({ message: "User is already followed or does not exist!" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.followUserController = followUserController;
const getFollowingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const following = yield (0, user_service_1.getFollowing)(parseInt(id, 10));
        res.status(200).json(following);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getFollowingController = getFollowingController;
const getFollowersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const followers = yield (0, user_service_1.getFollowers)(parseInt(id, 10));
        res.status(200).json(followers);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getFollowersController = getFollowersController;
