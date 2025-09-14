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

/*
model Person {
  id                        Int      @id @default(autoincrement())
  name                      String
  billId                    Int
  bill                      Bill     @relation
  individualTipPercentage   Int?
  individualAmount          Float?

}
 */