import { omit } from 'lodash';
import { Model, Op } from 'sequelize'; // Import ValidationError from Sequelize
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';
import { ITransactionDocument, ITransactionResult } from '~transaction/interfaces/transaction.interface';
import { TransactionModel } from '~transaction/models/transaction.model';
import { userSavingService } from '~services/db/userSaving.service';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { SavingPlanModel } from '~savingPlan/models/savingPlan.model';
import { IUserSavingDocument } from '~userSaving/interfaces/userSaving.interface';
import { BankAccountModel } from '~transaction/models/bankAccount.model';
import { BadRequestError } from '@quan0401/ecommerce-shared';

class TransactionService {
  // makePayment
  // withdraw
  // scheduleTransaction
  // cacnelScheduledTransaction

  public async makePayment(transactionDoc: Required<ITransactionDocument>): Promise<ITransactionResult> {
    if (transactionDoc.transactionType !== 1) {
      throw new BadRequestError('TransactionType must be 1 for make payment and 0 for withdraw', 'TransactionService makePayment');
    }
    // const bankAccount: Model | null = await BankAccountModel.findByPk(transactionDoc.bankAccountId);
    // if (bankAccount === null) {
    //   throw new BadRequestError('Bank Account not exists', 'TransactionService makePayment');
    // }
    // const updatedUserSaving: IUserSavingDocument = await userSavingService.topUpMoney(
    //   transactionDoc.userId,
    //   transactionDoc.savingPlanId,
    //   transactionDoc.amount
    // );
    // TODO: make hanlder for isSuccessful
    const createdTransaction: Model = await TransactionModel.create({
      ...transactionDoc,
      isSuccessful: 0
    });
    return {
      transaction: createdTransaction.dataValues
    };
  }

  public async markPaymentStatus(
    userId: string,
    transactionId: string,
    savingPlanId: string,
    status: 1 | 0
  ): Promise<ITransactionResult | undefined> {
    if (status === 1) {
      const transaction: Model<ITransactionDocument> | null = await TransactionModel.findOne({
        where: {
          userId,
          savingPlanId,
          id: transactionId,
          isSuccessful: 0
        }
      });
      if (!transaction) return;
      const updated = await TransactionModel.update(
        {
          isSuccessful: status
        },
        {
          where: {
            userId,
            savingPlanId,
            id: transactionId
          }
        }
      );

      if (updated[0] === 0) return;
      const userSaving: IUserSavingDocument = await userSavingService.topUpMoney(
        userId,
        savingPlanId,
        transaction.dataValues.amount as number
      );
      return { transaction: transaction.dataValues, userSaving };
    }
  }

  public async makePaymentWithMomo(transactionDoc: Required<ITransactionDocument>): Promise<ITransactionResult> {
    if (transactionDoc.transactionType !== 1) {
      throw new BadRequestError('TransactionType must be 1 for make payment and 0 for withdraw', 'TransactionService makePayment');
    }
    const updatedUserSaving: IUserSavingDocument = await userSavingService.topUpMoney(
      transactionDoc.userId,
      transactionDoc.savingPlanId,
      transactionDoc.amount
    );
    // TODO: make hanlder for isSuccessful
    const createdTransaction: Model = await TransactionModel.create({
      ...transactionDoc,
      isSuccessful: 1
    });
    return {
      transaction: createdTransaction.dataValues,
      userSaving: updatedUserSaving
    };
  }

  public async withdraw(transactionDoc: Required<ITransactionDocument>): Promise<ITransactionResult> {
    if (transactionDoc.transactionType !== -1) {
      throw new BadRequestError('TransactionType must be -1 for withdrawal', 'TransactionService makePayment');
    }
    const bankAccount: Model | null = await BankAccountModel.findByPk(transactionDoc.bankAccountId);
    if (bankAccount === null) {
      throw new BadRequestError('Bank Account not exists', 'TransactionService makePayment');
    }
    const updatedUserSaving: IUserSavingDocument = await userSavingService.withdrawMoney(
      transactionDoc.userId,
      transactionDoc.savingPlanId,
      transactionDoc.amount
    );
    // TODO: make hanlder for isSuccessful
    const createdTransaction: Model = await TransactionModel.create({
      ...transactionDoc,
      isSuccessful: 1
    });
    return {
      transaction: createdTransaction.dataValues,
      userSaving: updatedUserSaving
    };
  }
  public async getAllTransactionsOfUser(userId: string): Promise<ITransactionDocument[]> {
    const transactions: ITransactionDocument[] = (
      await TransactionModel.findAll({
        where: {
          userId
        },
        order: [['transactionDate', 'DESC']]
      })
    ).map((tran) => tran.dataValues);
    return transactions;
  }

  public async getTransactionsOfUserBySavingPlan(userId: string, savingPlanId: string): Promise<ITransactionDocument[]> {
    const transactions: ITransactionDocument[] = (
      await TransactionModel.findAll({
        where: {
          userId,
          savingPlanId
        },
        order: [['transactionDate', 'DESC']]
      })
    ).map((tran) => {
      const value = tran.dataValues;
      return value;
    });
    return transactions;
  }

  public async getTransactionsByDate(userId: string, startDate: Date, endDate: Date): Promise<ITransactionDocument[]> {
    // Set startDate to the beginning of the day
    startDate.setHours(0, 0, 0, 0);
    // Set endDate to the end of the day
    endDate.setHours(23, 59, 59, 999);

    const transactions: ITransactionDocument[] = (
      await TransactionModel.findAll({
        where: {
          userId,
          transactionDate: {
            [Op.between]: [startDate, endDate]
          }
        },
        order: [['transactionDate', 'DESC']]
      })
    ).map((tran) => tran.dataValues);
    return transactions;
  }

  // public async scheduleTransaction(data: ITransactionDocument): Promise<ITransactionDocument> {}
  // public async cacnelScheduledTransaction(data: ITransactionDocument): Promise<ITransactionDocument> {}
}
export const transactionService: TransactionService = new TransactionService();
