export interface Person{
  id: string;
  name: string;
  tipAmound: number;
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
model Bill {
  id                    Int         @id @default(autoincrement())
  totalAmount           Float
  defaultTipPercentage  Int
  people                Person[]

  @@map("bills")
}

model Person {
  id                        Int      @id @default(autoincrement())
  name                      String
  billId                    Int
  bill                      Bill     @relation(fields: [billId], references: [id])
  individualTipPercentage   Int?
  individualAmount          Float?

  @@map("persons")
}
 */