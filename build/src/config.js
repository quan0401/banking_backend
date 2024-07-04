"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
class Config {
    constructor() {
        this.MYSQL_DB = process.env.MYSQL_DB;
        this.JWT_TOKEN = process.env.JWT_TOKEN;
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
        this.NODE_ENV = process.env.NODE_ENV;
        this.CLOUD_NAME = process.env.CLOUD_NAME;
        this.CLOUD_FOLDER = process.env.CLOUD_FOLDER;
        this.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
        this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY;
        this.MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY;
    }
    cloudinaryConfig() {
        cloudinary_1.v2.config({
            secure: this.NODE_ENV !== 'development',
            api_key: this.CLOUD_API_KEY,
            api_secret: this.CLOUD_API_SECRET,
            cloud_name: this.CLOUD_NAME
        });
    }
}
exports.config = new Config();
//# sourceMappingURL=config.js.map