import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ISaving } from '~auth/interfaces/userSaving.interface';
import { savingService } from '~services/db/saving.service'; 
import { joiValidation } from '~global/decorators/joi-validation.decorator';

import { BadRequestError, IErrorResponse } from '@quan0401/ecommerce-shared';

export class Saving {
  public async createSaving(req: Request, res: Response): Promise<void> {
    try {

      const { userId, savingPlanId, balance, status } = req.body as ISaving;

      const userData: ISaving = {
        userId,
        savingPlanId,
        balance,
        status
      } as ISaving;

      const result: ISaving | IErrorResponse = await savingService.openSaving(userData);

      if ('statusCode' in result && result.statusCode === -1) {
        throw new BadRequestError(result.message, result.comingFrom);
      }

      res.status(StatusCodes.CREATED).json({ message: 'Saving created successfully', saving: result });
    } catch (error) {
      console.error('Error creating saving:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }
  async updateBalanceWithdraw(req: Request, res: Response) {
    const { savingID, balance } = req.body;

    try {
      const success = await savingService.updateBalanceWithdraw(savingID, balance);

      if (success) {
        return res.status(200).json({ message: 'Balance updated successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to update balance' });
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async updateBalanceDeposit(req: Request, res: Response) {
    const { savingID, balance } = req.body;

    try {
      const success = await savingService.updateBalanceDeposit(savingID, balance);

      if (success) {
        return res.status(200).json({ message: 'Balance updated successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to update balance' });
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}