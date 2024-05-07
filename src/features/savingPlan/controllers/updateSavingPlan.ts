import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { savingPlanService } from '~services/db/savingPlan.service';
import { updateSavingPlanScheme } from '~savingPlan/schemes/savingPlan.cheme';

export class UpdateSavingPlan {
  @joiValidation(updateSavingPlanScheme)
  public async byId(req: Request, res: Response): Promise<void> {
    const savingPlan: ISavingPlanDocument | undefined = await savingPlanService.updateSavingPlanById(req.params.planId, req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Update Saving Plan successfully', savingPlan });
  }
}
