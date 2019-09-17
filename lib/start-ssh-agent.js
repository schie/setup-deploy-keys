"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const cuid_1 = __importDefault(require("cuid"));
function startSSHAgent(socketName) {
    const sockitName = socketName || cuid_1.default();
    child_process_1.execSync(`ssh-agent -s`);
    return sockitName;
}
exports.startSSHAgent = startSSHAgent;
