export interface ISavingPlanDocument {
  id?: string; // Assuming you have an auto-incrementing primary key
  termPeriod?: number;
  minimumBalance?: number;
  minimumEachTransaction?: number;
  interestRate?: number;
  description?: string;
  isActive?: 1 | 0;
  startDate?: Date;
  endDate?: Date | null;
  currency?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
