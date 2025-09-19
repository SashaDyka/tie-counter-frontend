import type { BillResponseDto } from "../types/dto";

export interface BillUI {
  id: number;
  totalAmount: number;
  tipPercent: number;
  peopleCount: number;
  people: PersonUI[];
}

export interface PersonUI {
  id: number;
  name: string;
  individualAmount: number;
  individualTipPercentage: number;
}

export const mapBillFromApi = (bill: BillResponseDto): BillUI => {
  return {
    id: bill.id,
    totalAmount: bill.totalAmount,
    tipPercent: bill.defaultTipPercentage,
    peopleCount: bill.people?.length ?? 0,
    people: bill.people.map((p) => ({
      id: p.id,
      name: p.name,
      individualAmount: p.individualAmount,
      individualTipPercentage: p.individualTipPercentage,
    })),
  };
};
