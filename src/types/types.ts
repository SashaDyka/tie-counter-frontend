export interface Person{
  id: number;
  name: string;
  tipAmount: number | null;
  tipPercent: number | null; 
}

//TODO: add response dto
export interface Bill{
  id: number;
  totalAmount: number;
  tipPercent: number;
  peopleCount: number;
  people: Person []; 
}
