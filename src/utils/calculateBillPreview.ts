
interface Participant {
  name: string;
  individualAmount?: number;           
  individualTipPercentage?: number; 
}

interface BillResult {
  tipAmount: number;
  totalWithTip: number;
  perPerson: { name: string; total: number; tip: number }[];
}

export const calculateBillPreview = (
  totalAmount: number,
  defaultTipPercent: number,
  people: Participant[]
): BillResult => {
  let remainingAmount = totalAmount;
  const perPersonResults = people.map(p => {
    const baseAmount = p.individualAmount ?? totalAmount / people.length;
    const tipPercent = p.individualTipPercentage ?? defaultTipPercent;
    const tip = baseAmount * (tipPercent / 100);
    const total = baseAmount + tip;
    remainingAmount -= baseAmount;
    return { name: p.name, total, tip };
  });

  const totalWithTip = perPersonResults.reduce((sum, p) => sum + p.total, 0);
  const tipAmount = perPersonResults.reduce((sum, p) => sum + p.tip, 0);

  return { tipAmount, totalWithTip, perPerson: perPersonResults };
};
