import { DataTypes, Optional, ModelDefined, CreateOptions, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { compare, hash } from 'bcryptjs';
import { sequelize } from '~/database';

export const SavingPlan = sequelize.define('SavingPlan', {
    schedule: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    interestRate: {
      type: DataTypes.FLOAT, 
      allowNull: false
    },
    minimumMoney: {
      type: DataTypes.FLOAT, 
      allowNull: false
    }
  });