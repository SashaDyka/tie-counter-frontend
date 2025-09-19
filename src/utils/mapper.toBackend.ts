import type { BillUI } from "./mapper.toFrontend";
//import { BillRequestDto } from '@/types/BillApi';

export function mapBillToApi(bill: BillUI) {
  const peopleToAdd = bill.people
    .filter((p) => !p.id || p.id === 0)
    .map((p) => ({
      name: p.name,
      individualAmount: p.individualAmount || undefined, //If the API uses individualAmount (rather than tipAmount),
      // then that is what should be used, and tipAmount should not be added.
      individualTipPercentage:
        p.individualTipPercentage === bill.tipPercent
          ? undefined
          : p.individualAmount,
    }));

  const peopleToUpdate = bill.people
    .filter((p) => p.id && p.id !== 0)
    .map((p) => ({
      id: p.id,
      name: p.name,
      individualAmount: p.individualAmount || undefined,
      individualTipPercentage:
        p.individualTipPercentage === bill.tipPercent
          ? undefined
          : p.individualAmount,
    }));

  // TODO: добавить peopleToRemove

  return {
    totalAmount: bill.totalAmount,
    defaultTipPercentage: bill.tipPercent,
    peopleToAdd,
    peopleToUpdate,
    peopleToRemove: [],
  };
}
