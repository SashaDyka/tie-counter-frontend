export interface Person{
    id: string;
    name: string;
    tipAmound: number;
}

export interface Bill{
    id: string;
    totalAmound: number;
    tipPercent: number;
    peopleCount: number;
    people: Person []; 
}