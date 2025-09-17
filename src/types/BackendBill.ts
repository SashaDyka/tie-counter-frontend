export interface BackendBill{
    id: number;
    totalAmount: number;
    defaultTipPercentage: number;
    people: Person []; 
}

export interface Person{
  id: number;
  name: string;
  tipAmount: number | null;
  tipPercent: number | null; 
}
