export interface Person{
  id: string;
  name: string;
  tipAmount: number;
  tipPercent: number; //new
}

export interface Bill{
  id: string;
  totalAmount: number;
  tipPercent: number;
  peopleCount: number;
  people: Person []; 
}
