"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
const config_1 = require("./config");
class App {
    initialize() {
        this.loadConfig();
        const app = (0, express_1.default)();
        const appServer = new server_1.AppServer(app);
        appServer.start();
    }
    loadConfig() {
        config_1.config.cloudinaryConfig();
    }
}
const app = new App();
app.initialize();
//# sourceMappingURL=app.js.map