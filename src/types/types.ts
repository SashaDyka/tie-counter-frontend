export interface Person{
  id: string;
  name: string;
  tipAmount: number | null;
  tipPercent: number | null; 
}

export interface Bill{
  id: string;
  totalAmount: number;
  tipPercent: number;
  peopleCount: number;
  people: Person []; 
}
