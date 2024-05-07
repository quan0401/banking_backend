import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { transactionService } from '~services/db/transaction.service';
import { ITransactionDocument, ITransactionResult } from '~transaction/interfaces/transaction.interface';
import { transactionScheme } from '~transaction/schemes/transaction.scheme';

export class Withdraw {
  @joiValidation(transactionScheme)
  public async withdraw(req: Request, res: Response): Promise<void> {
    const { savingPlanId } = req.params;
    const { bankAccountId, amount, transactionType } = req.body;
    const transactionDoc: ITransactionDocument = {
      userId: req.currentUser!.id,
      bankAccountId,
      amount,
      savingPlanId,
      transactionDate: new Date(),
      transactionType
    };
    const result: ITransactionResult = await transactionService.withdraw(transactionDoc as Required<ITransactionDocument>);
    res.status(StatusCodes.CREATED).json({
      message: 'WithDraw successfully',
      result
    });
  }
}
