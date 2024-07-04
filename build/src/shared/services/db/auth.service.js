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
exports.authService = void 0;
const lodash_1 = require("lodash");
const sequelize_1 = require("sequelize"); // Import ValidationError from Sequelize
const database_1 = require("../../../database");
const auth_model_1 = require("../../../features/auth/models/auth.model");
class AuthService {
    createNewUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = (yield auth_model_1.AuthModel.create(data)); // No need to cast to Model<IAuthDocument>
            const result = (0, lodash_1.omit)(createdUser.toJSON(), ['password']); // Use toJSON() to convert Sequelize model instance to plain JSON object
            return result;
        });
    }
    updateAuthInfo(authId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_model_1.AuthModel.findOne({
                where: {
                    id: authId
                }
            });
            if (user) {
                yield user.update(data);
                yield user.save();
            }
            return user === null || user === void 0 ? void 0 : user.dataValues;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const user: Model | null = await AuthModel.scope('withAdmin').findOne({
            const user = yield auth_model_1.AuthModel.scope('withAdmin').findByPk(id);
            return user === null || user === void 0 ? void 0 : user.dataValues;
        });
    }
    findUserByEmailOrPhone(phone, email) {
        return __awaiter(this, void 0, void 0, function* () {
            // const user: Model | null = await AuthModel.scope('withAdmin').findOne({
            const user = yield auth_model_1.AuthModel.scope('withAdmin').findOne({
                where: {
                    [sequelize_1.Op.or]: [{ email: email ? email : '' }, { phone: phone ? phone : '' }]
                }
            });
            return user === null || user === void 0 ? void 0 : user.dataValues;
        });
    }
    findUserByEmailToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_model_1.AuthModel.findOne({
                where: {
                    emailVerificationToken: token
                }
            });
            return user === null || user === void 0 ? void 0 : user.dataValues;
        });
    }
    updateVerifyEmail(authId, isVerified) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_model_1.AuthModel.findOne({
                where: {
                    id: authId
                }
            });
            if (user) {
                yield user.update({ emailVerified: isVerified });
                yield user.save();
            }
            return user === null || user === void 0 ? void 0 : user.dataValues;
        });
    }
    isAdmin(authId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_model_1.AuthModel.scope('withAdmin').findOne({
                where: {
                    id: authId
                }
            });
            return (user === null || user === void 0 ? void 0 : user.dataValues.isAdmin) === 1;
        });
    }
    // public async getUsersPagination(limit: number, offset: number): Promise<IAuthDocument[]> {
    //   const usersWithTransactions = await AuthModel.findAll({
    //     attributes: [
    //       'id',
    //       'username',
    //       'email',
    //       [Sequelize.fn('COUNT', Sequelize.col('transactions.id')), 'transactionCount'],
    //       [Sequelize.literal(`SUM(CASE WHEN transactions.transactionType = 1 THEN transactions.amount ELSE 0 END)`), 'totalTopUpAmount'],
    //       [Sequelize.literal(`SUM(CASE WHEN transactions.transactionType = -1 THEN transactions.amount ELSE 0 END)`), 'totalWithdrawalAmount']
    //     ],
    //     include: [
    //       {
    //         model: TransactionModel,
    //         as: 'transactions',
    //         attributes: [] // Do not include any attributes from the transactions table in the final output
    //       }
    //     ],
    //     group: ['auths.id'], // Grouping by AuthModel entries
    //     order: [
    //       ['totalTopUpAmount', 'DESC'] // Ordering AuthModel entries
    //     ],
    //     limit,
    //     offset
    //   });
    //   const result = usersWithTransactions.map((user: Model) => user.toJSON());
    //   return result;
    // }
    getUsersPagination(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    SELECT
      auths.id,
      auths.username,
      auths.email,
      COUNT(transactions.id) AS transactionCount,
      SUM(CASE WHEN transactions.transactionType = 1 THEN transactions.amount ELSE 0 END) AS totalTopUpAmount,
      SUM(CASE WHEN transactions.transactionType = -1 THEN transactions.amount ELSE 0 END) AS totalWithdrawalAmount
    FROM
      auths
    LEFT JOIN
      transactions ON auths.id = transactions.userId
    GROUP BY
      auths.id, auths.username, auths.email
    ORDER BY
      totalTopUpAmount DESC
    LIMIT
      :limit OFFSET :offset;
  `;
            const usersWithTransactions = yield database_1.sequelize.query(query, {
                replacements: { limit, offset },
                model: auth_model_1.AuthModel,
                mapToModel: true // Maps the results to models. Ensure this matches your actual model and query structure.
            });
            const total = yield auth_model_1.AuthModel.count();
            const users = usersWithTransactions.map((user) => user.toJSON());
            return {
                total,
                users
            };
        });
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map