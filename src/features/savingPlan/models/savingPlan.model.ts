import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { sequelize } from '~/database';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { v4 as uuidv4 } from 'uuid';

export type SavingPlanCreationAttributes = Optional<ISavingPlanDocument, 'id' | 'createdAt' | 'updatedAt'>;

export const SavingPlanModel: ModelDefined<ISavingPlanDocument, SavingPlanCreationAttributes> = sequelize.define(
  'savingPlans',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4()
    },
    termPeriod: {
      type: DataTypes.INTEGER, // Changed data type to INTEGER
      allowNull: false
    },
    minimumBalance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    maximumBalance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    minimumEachTransaction: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    interestRate: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'VND' // Default currency
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    version: true
  }
);

// You might want to handle the sync operation in a try-catch block to catch any errors.
SavingPlanModel.sync({
  // force: true
});
