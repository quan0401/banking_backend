import { IUserSavingDocument } from '~userSaving/interfaces/userSaving.interface';
import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '~/database';
import { v4 as uuidv4 } from 'uuid';

type IUserSavingCreationAttributes = Optional<IUserSavingDocument, 'id' | 'createdAt' | 'updatedAt'>;

export const UserSavingModel: ModelDefined<IUserSavingDocument, IUserSavingCreationAttributes> = sequelize.define(
  'userSaving',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4()
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    savingPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    lastUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date() // Default to current date and time
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    targetAmount: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);

UserSavingModel.sync({});
