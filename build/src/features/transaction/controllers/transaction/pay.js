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
exports.Pay = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const axios_1 = __importDefault(require("axios"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../../../config");
const joi_validation_decorator_1 = require("../../../../shared/globals/decorators/joi-validation.decorator");
const transaction_service_1 = require("../../../../shared/services/db/transaction.service");
const transaction_scheme_1 = require("../../schemes/transaction.scheme");
class Pay {
    // pay
    // scheduledPay
    pay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { savingPlanId } = req.params;
            const { bankAccountId, amount, transactionType } = req.body;
            const transactionDoc = {
                userId: req.currentUser.id,
                bankAccountId,
                amount,
                savingPlanId,
                transactionDate: new Date(),
                transactionType
            };
            const momoResponse = yield Pay.prototype.momo(amount, savingPlanId);
            console.log('momoResponse:::::: ', momoResponse);
            const result = yield transaction_service_1.transactionService.makePayment(transactionDoc);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Return momo url', result: momoResponse, transaction: result.transaction });
        });
    }
    momo(amount, savingPlanId) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
                //parameters
                const accessKey = `${config_1.config.MOMO_ACCESS_KEY}`;
                const secretKey = `${config_1.config.MOMO_SECRET_KEY}`;
                var orderInfo = 'pay with MoMo';
                var partnerCode = 'MOMO';
                var redirectUrl = `http://localhost:3002/checkout/${savingPlanId}`;
                var ipnUrl = 'http://localhost:6969/api/v1/transaction/test';
                var requestType = 'payWithMethod';
                var orderId = partnerCode + new Date().getTime();
                var requestId = orderId;
                var extraData = '';
                var orderGroupId = '';
                var autoCapture = true;
                var lang = 'vi';
                //before sign HMAC SHA256 with format
                //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
                var rawSignature = 'accessKey=' +
                    accessKey +
                    '&amount=' +
                    amount +
                    '&extraData=' +
                    extraData +
                    '&ipnUrl=' +
                    ipnUrl +
                    '&orderId=' +
                    orderId +
                    '&orderInfo=' +
                    orderInfo +
                    '&partnerCode=' +
                    partnerCode +
                    '&redirectUrl=' +
                    redirectUrl +
                    '&requestId=' +
                    requestId +
                    '&requestType=' +
                    requestType;
                //puts raw signature
                // console.log('--------------------RAW SIGNATURE----------------');
                // console.log(rawSignature);
                //signature
                const crypto = require('crypto');
                var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
                // console.log('--------------------SIGNATURE----------------');
                // console.log(signature);
                //json object send to MoMo endpoint
                const requestBody = JSON.stringify({
                    partnerCode: partnerCode,
                    partnerName: 'Test',
                    storeId: 'MomoTestStore',
                    requestId: requestId,
                    amount: amount,
                    orderId: orderId,
                    orderInfo: orderInfo,
                    redirectUrl: redirectUrl,
                    ipnUrl: ipnUrl,
                    lang: lang,
                    requestType: requestType,
                    autoCapture: autoCapture,
                    extraData: extraData,
                    orderGroupId: orderGroupId,
                    signature: signature
                });
                const options = {
                    method: 'POST',
                    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(requestBody)
                    },
                    data: requestBody
                };
                return (yield (0, axios_1.default)(options)).data;
            }
        });
    }
    // This works but some thing gone wrong with momo
    // public async checkPaymentStatus(req: Request, res: Response): Promise<void> {
    //   const { orderId, transactionId, savingPlanId } = req.body;
    //   if (!orderId) {
    //     throw new BadRequestError('orderId is required', 'CheckPaymentStatus');
    //   } else if (!transactionId) {
    //     throw new BadRequestError('transactionId is required', 'CheckPaymentStatus');
    //   }
    //   // const signature = accessKey=$accessKey&orderId=$orderId&partnerCode=$partnerCode
    //   // &requestId=$requestId
    //   const accessKey = `${config.MOMO_ACCESS_KEY}`;
    //   const secretKey = `${config.MOMO_SECRET_KEY}`;
    //   const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
    //   const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
    //   const requestBody = JSON.stringify({
    //     partnerCode: 'MOMO',
    //     requestId: orderId,
    //     orderId: orderId,
    //     signature: signature,
    //     lang: 'vi'
    //   });
    //   // options for axios
    //   const options = {
    //     method: 'POST',
    //     url: 'https://test-payment.momo.vn/v2/gateway/api/query',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: requestBody
    //   };
    //   const result: IMoMoResponse = (await axios(options)).data;
    //   if (result.resultCode === 0) {
    //     await transactionService.markPaymentStatus(req.currentUser!.id, transactionId, savingPlanId, 1);
    //     res.status(StatusCodes.OK).json({ message: 'Payment success', resultCode: result.resultCode });
    //   } else {
    //     res.status(StatusCodes.BAD_REQUEST).json({ message: 'Payment failed', resultCode: result.resultCode });
    //   }
    // }
    checkPaymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId, transactionId, savingPlanId } = req.body;
            if (!orderId) {
                throw new ecommerce_shared_1.BadRequestError('orderId is required', 'CheckPaymentStatus');
            }
            else if (!transactionId) {
                throw new ecommerce_shared_1.BadRequestError('transactionId is required', 'CheckPaymentStatus');
            }
            yield transaction_service_1.transactionService.markPaymentStatus(req.currentUser.id, transactionId, savingPlanId, 1);
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Payment success', resultCode: 0 });
        });
    }
}
exports.Pay = Pay;
__decorate([
    (0, joi_validation_decorator_1.joiValidation)(transaction_scheme_1.transactionScheme),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Pay.prototype, "pay", null);
//# sourceMappingURL=pay.js.map