
import { ISaving } from "~auth/interfaces/userSaving.interface";
import { savingService } from "~services/db/saving.service";
async function testOpenSaving() {
  
  const test: ISaving = {
    userId: 123, 
    savingPlanId: 1, 
    balance: 1000, 
    status: true, 
  } as ISaving;

  try {
    // Call the openSaving method with mock data
    const saving = await savingService.openSaving(test);

    // Log the result
    console.log('Saving created:', saving);
  } catch (error) {
    // Handle any errors
    console.error('Error creating saving:', error);
  }
}

// Run the test
testOpenSaving();
