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
exports.getFollowers = exports.getFollowing = exports.followUser = exports.findUsers = exports.findUserWithFollowing = exports.findUserBy = exports.createUser = void 0;
require("dotenv");
const user_entity_1 = require("../entities/user.entity");
const data_source_1 = require("../utils/data-source");
const kafka_1 = require("../utils/kafka");
const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.save(userRepository.create(input));
    if (user) {
        (0, kafka_1.sendMessage)("user-created", user);
        return user;
    }
    return undefined;
});
exports.createUser = createUser;
const findUserBy = (options) => __awaiter(void 0, void 0, void 0, function* () {
    if (options.username) {
        return yield userRepository.findOne({
            where: { username: options.username },
            relations: ["following"],
        });
    }
    else if (options.userId) {
        return yield userRepository.findOne({
            where: {
                id: options.userId,
            },
            relations: ["following"],
        });
    }
    return null;
});
exports.findUserBy = findUserBy;
const findUserWithFollowing = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findOne({
        where: { username },
        relations: ["following"],
    });
});
exports.findUserWithFollowing = findUserWithFollowing;
const findUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.find(query);
});
exports.findUsers = findUsers;
const followUser = (followerId, followedId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(followerId, " ", followedId);
    if (followerId === followedId) {
        return false;
    }
    const follower = yield userRepository.findOne({
        where: { id: followerId },
        relations: ["following"],
    });
    const followed = yield userRepository.findOne({
        where: { id: followedId },
        relations: ["followers"],
    });
    if (follower && followed) {
        const isAlreadyFollowing = follower.following.some((user) => user.id === followedId);
        if (!isAlreadyFollowing) {
            followed.followers = [...followed.followers, follower];
            yield userRepository.save(followed);
            return true;
        }
        else {
            return false;
        }
    }
    return false;
});
exports.followUser = followUser;
const getFollowing = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findOne({
        where: { id: userId },
        relations: ["following"],
    });
    return user ? user.following : [];
});
exports.getFollowing = getFollowing;
const getFollowers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findOne({
        where: { id: userId },
        relations: ["followers"],
    });
    return user ? user.followers : [];
});
exports.getFollowers = getFollowers;
