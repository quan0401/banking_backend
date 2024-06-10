import { IUserSavingDocument } from '~userSaving/interfaces/userSaving.interface';

export interface ITransactionDocument {
  id?: string; // Assuming you have an auto-incrementing primary key
  userId?: string;
  bankAccountId?: string;
  savingPlanId?: string;
  amount?: number;
  isSuccessful?: number;
  transactionDate?: Date;
  scheduledDate?: Date;
  transactionType?: 1 | -1; // 1 for purchase, -1 for withdrawal
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransactionResult {
  transaction?: ITransactionDocument;
  userSaving?: IUserSavingDocument;
}

export interface IMoMoResponse {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;
  shortLink: string;
}
