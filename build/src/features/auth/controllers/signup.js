"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Signup = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("../../../shared/services/db/auth.service");
const uuid_1 = require("uuid");
const crypto_1 = __importDefault(require("crypto"));
const joi_validation_decorator_1 = require("../../../shared/globals/decorators/joi-validation.decorator");
const signup_scheme_1 = require("../schemes/signup.scheme");
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const config_1 = require("../../../config");
const faker_1 = require("@faker-js/faker");
const auth_model_1 = require("../models/auth.model");
class Signup {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email, phone, cccd, homeAddress, profilePicture } = req.body;
            const isExisted = yield auth_service_1.authService.findUserByEmailOrPhone('', email);
            if (isExisted)
                throw new ecommerce_shared_1.BadRequestError('User already exists', 'Signup');
            const profilePublicId = (0, uuid_1.v4)();
            const randomBytes = crypto_1.default.randomBytes(20);
            const randomCharacters = randomBytes.toString('hex');
            // upload image to cloudinary
            const response = (yield (0, ecommerce_shared_1.uploads)(profilePicture, config_1.config.CLOUD_FOLDER));
            if (!(response === null || response === void 0 ? void 0 : response.public_id))
                throw new ecommerce_shared_1.BadRequestError('File upload error, please try again!', 'Signup cloudinary uploads');
            const profilePictureUrl = response.url;
            const userData = {
                profilePublicId,
                username,
                email,
                phone,
                password,
                cccd,
                homeAddress,
                profilePicture: profilePictureUrl,
                emailVerificationToken: randomCharacters,
                isAdmin: 0
            };
            // upload to database
            const result = yield auth_service_1.authService.createNewUser(userData);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Create user successfully', user: result });
        });
    }
    seed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count } = req.params;
            const numUsers = parseInt(count, 10);
            if (isNaN(numUsers) || numUsers <= 0) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Invalid count parameter' });
                return;
            }
            const users = [];
            for (let i = 0; i < numUsers; i++) {
                const profilePublicId = (0, uuid_1.v4)();
                const randomBytes = crypto_1.default.randomBytes(20);
                const randomCharacters = randomBytes.toString('hex');
                const profilePictureUrl = faker_1.faker.image.avatar(); // Generating a random avatar image
                const user = {
                    profilePublicId,
                    username: faker_1.faker.internet.userName(),
                    email: faker_1.faker.internet.email(),
                    phone: faker_1.faker.phone.number(),
                    password: faker_1.faker.internet.password(),
                    cccd: faker_1.faker.string.numeric(12),
                    homeAddress: faker_1.faker.address.streetAddress(),
                    profilePicture: profilePictureUrl,
                    emailVerificationToken: randomCharacters,
                    isAdmin: 0
                };
                users.push(user);
            }
            // Uploading all users to the database
            const createdUsers = yield auth_model_1.AuthModel.bulkCreate(users);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: `Created ${createdUsers.length} users successfully`, users: createdUsers });
        });
    }
}
exports.Signup = Signup;
__decorate([
    (0, joi_validation_decorator_1.joiValidation)(signup_scheme_1.signupScheme),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Signup.prototype, "signup", null);
//# sourceMappingURL=signup.js.map