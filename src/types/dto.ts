export interface CreateParticipantDto {
  name: string;
  individualAmount: number;
  individualTipPercentage: number;
}

export interface UpdateParticipantDto {
  id: number; 
  name?: string;
  individualAmount?: number;
  individualTipPercentage?: number;
}

export interface UpdateBillDto {
  totalAmount?: number;
  defaultTipPercentage?: number;
  peopleToAdd?: CreateParticipantDto[];
  peopleToUpdate?: UpdateParticipantDto[];
  peopleToRemove?: number[]; 
}

export interface CreateBillDto {
  totalAmount: number;
  defaultTipPercentage: number;
  people?: CreateParticipantDto[];
}

export interface BillResponseDto {
  id: number;
  totalAmount: number;
  defaultTipPercentage: number;
  people: {
    id: number;
    name: string;
    individualAmount: number;
    individualTipPercentage: number;
  }[];
}
