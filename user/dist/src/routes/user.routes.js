"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const follow_schema_1 = require("../schemas/follow.schema");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
router.get("/me", user_controller_1.getUserHandler);
router.get("/:username", user_controller_1.findByUsernameController);
// router.get("/:id", findUserController);
router.get("/", user_controller_1.findUsersController);
router.post("/follow", (0, validate_1.validate)(follow_schema_1.followUserSchema), user_controller_1.followUserController);
router.get("/following/:id", user_controller_1.getFollowingController);
router.get("/followers/:id", user_controller_1.getFollowersController);
exports.default = router;
