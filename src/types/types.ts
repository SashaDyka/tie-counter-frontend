export interface Person{
  id: string;
  name: string;
  tipAmound: number;
}

export interface Bill{
  id: string;
  totalAmount: number;
  tipPercent: number;
  peopleCount: number;
  people: Person []; 
}

