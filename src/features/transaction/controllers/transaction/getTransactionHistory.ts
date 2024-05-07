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

export class GetTransactionHistory {
  // TODO:
  // historyPaginate
  // historyByDate
  // withdrawHistoryOnly
  public async all(req: Request, res: Response): Promise<void> {
    const transactions: ITransactionDocument[] = await transactionService.getAllTransactionsOfUser(req.currentUser!.id);
    res.status(StatusCodes.CREATED).json({
      message: 'Get all trancsactions successfully',
      transactions
    });
  }

  public async transactionsByPlanId(req: Request, res: Response): Promise<void> {
    const { savingPlanId } = req.params;
    const transactions: ITransactionDocument[] = await transactionService.getTransactionsOfUserBySavingPlan(
      req.currentUser!.id,
      savingPlanId
    );
    res.status(StatusCodes.CREATED).json({
      message: 'Get all trancsactions by PlanId successfully',
      transactions
    });
  }
}
