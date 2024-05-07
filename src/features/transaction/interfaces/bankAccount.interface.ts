export interface IBankAccountDocument {
  id?: string;
  userId?: string;
  accountHolder?: string;
  bankName?: string;
  accountNumber?: string;
  ownerAddress?: string | null;
  ownerContact?: string | null;
  accountType?: string | null;
  currency?: string;
  branch?: string | null;
  status?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
