import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BillUI } from '../../utils/mappers.ts';


interface BillsState {
  bills: BillUI[];
  selectedBill: BillUI | null;
}

const initialState: BillsState = {
  bills: [],
  selectedBill: null,
};

//action need works with service?
//actions work correct??
const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<BillUI[]>) => {
      state.bills = action.payload;
    },
    selectBill: (state, action: PayloadAction<BillUI | null>) => {
      state.selectedBill = action.payload;
    },
    addBill: (state, action: PayloadAction<BillUI>) => {
      state.bills.push(action.payload);
    },
    updateBillInStore: (state, action: PayloadAction<BillUI>) => {
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

export const { setBills, selectBill, addBill, updateBillInStore, deletedBill } = billsSlice.actions;
export default billsSlice.reducer;
