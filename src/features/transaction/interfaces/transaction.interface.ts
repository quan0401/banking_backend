export interface ITransactionDocument {
  id: string; // Assuming you have an auto-incrementing primary key
  userId: string;
  transactorName: string;
  savingPlanId: string;
  amount: number;
  isSuccessful: number;
  transactionDate: Date;
  transactionType: 1 | -1; // 1 for purchase, -1 for withdrawal
  createdAt: Date;
  updatedAt: Date;
}
