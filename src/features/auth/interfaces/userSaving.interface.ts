import { Model } from 'sequelize';

export interface ISaving {
  savingID?: number;
  userId?: number;
  savingPlanId?: string;
  balance: number;
  status?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
