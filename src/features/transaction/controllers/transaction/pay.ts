import { BadRequestError, uploads } from '@quan0401/ecommerce-shared';
import { UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '~/config';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { savingPlanScheme } from '~savingPlan/schemes/savingPlan.cheme';
import { savingPlanService } from '~services/db/savingPlan.service';
import { transactionService } from '~services/db/transaction.service';
import { ITransactionDocument, ITransactionResult } from '~transaction/interfaces/transaction.interface';
import { transactionScheme } from '~transaction/schemes/transaction.scheme';

export class Pay {
  // pay
  // scheduledPay
  @joiValidation(transactionScheme)
  public async pay(req: Request, res: Response): Promise<void> {
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
    const result: ITransactionResult = await transactionService.makePayment(transactionDoc as Required<ITransactionDocument>);
    res.status(StatusCodes.CREATED).json({
      message: 'Make trancsaction successfully',
      result
    });
  }
}
