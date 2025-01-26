"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSuccessProbability = exports.generateConfirmationCode = exports.generateCodename = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateCodename = () => {
    const prefixes = ['The', 'Operation'];
    const nouns = ['Nightingale', 'Kraken', 'Phoenix', 'Shadow', 'Phantom'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
};
exports.generateCodename = generateCodename;
const generateConfirmationCode = () => {
    return crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
};
exports.generateConfirmationCode = generateConfirmationCode;
const generateSuccessProbability = () => {
    return Math.floor(Math.random() * 50) + 50;
};
exports.generateSuccessProbability = generateSuccessProbability;
