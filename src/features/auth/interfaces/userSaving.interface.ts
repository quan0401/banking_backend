import { Model } from 'sequelize';

export interface ISaving {
  id?: number;
  userId?: number;
  savingPlanId?: string;
  balance: number;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
