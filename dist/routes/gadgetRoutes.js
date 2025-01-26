"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gadgetController_1 = require("../controllers/gadgetController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.authenticate, gadgetController_1.getAllGadgets);
router.post("/", authMiddleware_1.authenticate, gadgetController_1.createGadget);
router.patch("/:id", authMiddleware_1.authenticate, gadgetController_1.updateGadget);
router.delete("/:id", authMiddleware_1.authenticate, gadgetController_1.decommissionGadget);
router.post("/:id/self-destruct", authMiddleware_1.authenticate, gadgetController_1.selfDestructGadget);
router.post("/login", gadgetController_1.loginAgent);
exports.default = router;
