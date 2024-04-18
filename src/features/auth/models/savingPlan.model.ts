import { DataTypes, Optional, ModelDefined, CreateOptions, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { compare, hash } from 'bcryptjs';
import { sequelize } from '~/database';

export const SavingPlan = sequelize.define('SavingPlan', {
  typeID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  termDeposit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  interestRate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  minimumMoney: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000000
  }
});

SavingPlan.sync({});
