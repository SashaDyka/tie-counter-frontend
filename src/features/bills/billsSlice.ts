import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bills: [],
  selectedBill: null,
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setBills: (state, action) => {
      state.bills = action.payload;
    },
    selectBill: (state, action) => {
      state.selectedBill = action.payload;
    },
    addBill: (state, action) => {
      state.bills.push(action.payload);
    },
    updateBill: (state, action) => {
      const index = state.bills.findIndex(bill => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    deletedBill: (state, action) => {
      state.bills = state.bills.filter(bill => bill.id !== action.payload);
    },
  },
});

export const { setBills, selectBill, addBill, updateBill, deletedBill } = billsSlice.actions;
export default billsSlice.reducer;