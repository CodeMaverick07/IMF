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
exports.loginAgent = exports.selfDestructGadget = exports.decommissionGadget = exports.updateGadget = exports.createGadget = exports.getAllGadgets = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const codeGenerator_1 = require("../utils/codeGenerator");
const prisma = new client_1.PrismaClient();
const getAllGadgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.query;
        const gadgets = yield prisma.gadget.findMany({
            where: status ? { status: status } : {},
        });
        const gadgetsWithProbability = gadgets.map((gadget) => (Object.assign(Object.assign({}, gadget), { successProbability: `${(0, codeGenerator_1.generateSuccessProbability)()}%` })));
        res.json(gadgetsWithProbability);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllGadgets = getAllGadgets;
const createGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("inside create gadget", req.body.name);
        const { name } = req.body;
        const gadget = yield prisma.gadget.create({
            data: {
                name,
                codename: (0, codeGenerator_1.generateCodename)(),
            },
        });
        res.status(201).json(gadget);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createGadget = createGadget;
const updateGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedGadget = yield prisma.gadget.update({
            where: { id },
            data: req.body,
        });
        res.json(updatedGadget);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateGadget = updateGadget;
const decommissionGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.gadget.update({
            where: { id },
            data: {
                status: "Decommissioned",
                decommissionedAt: new Date(),
            },
        });
        res.json({ message: "Gadget decommissioned" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.decommissionGadget = decommissionGadget;
const selfDestructGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { confirmationCode } = req.body;
        if (confirmationCode !== "1234") {
            res.status(400).json({ error: "Invalid confirmation code" });
            return;
        }
        yield prisma.gadget.update({
            where: { id },
            data: { status: "Destroyed" },
        });
        res.json({ message: "Gadget self-destructed" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.selfDestructGadget = selfDestructGadget;
const loginAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside the login");
    const token = jsonwebtoken_1.default.sign({ id: "agent123" }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.json({ token });
});
exports.loginAgent = loginAgent;
