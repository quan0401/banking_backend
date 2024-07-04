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
exports.AuthModel = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = require("bcryptjs");
const database_1 = require("../../../database");
const uuid_1 = require("uuid");
const transaction_model_1 = require("../../transaction/models/transaction.model");
const SALT_ROUND = 10;
exports.AuthModel = database_1.sequelize.define('auths', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => (0, uuid_1.v4)()
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    profilePublicId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cccd: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    isAdmin: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    homeAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    profilePicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    emailVerificationToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    emailVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now
    },
    passwordResetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    passwordResetExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ['isAdmin']
        }
    },
    scopes: {
        withAdmin: {
            attributes: {}
        }
    },
    indexes: [
        {
            unique: false,
            fields: ['username']
        },
        {
            unique: true,
            fields: ['phone']
        },
        {
            unique: true,
            fields: ['email']
        },
        {
            unique: true,
            fields: ['emailVerificationToken']
        }
    ]
});
// Step 1: Define associations (if not already done)
exports.AuthModel.hasMany(transaction_model_1.TransactionModel, { foreignKey: 'userId' });
transaction_model_1.TransactionModel.belongsTo(exports.AuthModel, { foreignKey: 'userId' });
exports.AuthModel.addHook('beforeCreate', (auth, options) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, bcryptjs_1.hash)(auth.dataValues.password, SALT_ROUND);
    auth.dataValues.password = hashedPassword;
}));
exports.AuthModel.prototype.comparePassword = function (password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, bcryptjs_1.compare)(password, hashedPassword);
    });
};
exports.AuthModel.prototype.hashPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve((0, bcryptjs_1.hash)(password, SALT_ROUND));
    });
};
exports.AuthModel.sync({
// force: true
});
//# sourceMappingURL=auth.model.js.map