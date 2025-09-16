import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; 
import type { Bill } from '../../types/types';

export interface BillsState {
  bills: Bill[];
}

const initialState: BillsState = {
  bills: [],
};


export const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<{ billAmount: number; tipPercentage: number }>) => {
      const { billAmount, tipPercentage } = action.payload;
      const tipAmount = billAmount * (tipPercentage / 100);
      const totalAmount = billAmount + tipAmount;

      const newBill: Bill = {
        id: uuidv4(),
        billAmount,
        tipPercentage,
        totalAmount,
      };
      state.bills.push(newBill);
    },
    removeBill: (state, action: PayloadAction<string>) => {
      state.bills = state.bills.filter(bill => bill.id !== action.payload);
    },
    updateBill: (state, action: PayloadAction<Bill>) => {
      const { id, billAmount, tipPercentage } = action.payload;
      const index = state.bills.findIndex(bill => bill.id === id);
      if (index !== -1) {
        const tipAmount = billAmount * (tipPercentage / 100);
        state.bills[index] = {
          ...state.bills[index],
          billAmount,
          tipPercentage,
          totalAmount: billAmount + tipAmount,
        };
      }
    },
  },
});

export const { addBill, removeBill, updateBill } = billsSlice.actions;

export default billsSlice.reducer;