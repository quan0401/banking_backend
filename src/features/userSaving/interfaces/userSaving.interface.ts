export interface IUserSavingDocument {
  id: number;
  userId: number;
  savingPlanId: number;
  totalAmount: number;
  lastUpdated: Date;
  currency?: string | null;
  targetAmount?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
