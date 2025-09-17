import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Bill } from '../../types/types';

interface BillsState {
  bills: Bill[];
  selectedBill: Bill | null;
}

const initialState: BillsState = {
  bills: [],
  selectedBill: null,
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
    },
    selectBill: (state, action: PayloadAction<Bill | null>) => {
      state.selectedBill = action.payload;
    },
    addBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
    },
    updateBillInStore: (state, action: PayloadAction<Bill>) => {
      const index = state.bills.findIndex(bill => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    deletedBill: (state, action: PayloadAction<number>) => {
      state.bills = state.bills.filter(bill => bill.id !== action.payload);
    },
  },
});

// Экспорт экшенов
export const { setBills, selectBill, addBill, updateBillInStore, deletedBill } = billsSlice.actions;

// Экспорт редьюсера
export default billsSlice.reducer;
