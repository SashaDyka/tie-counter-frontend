import React from 'react';
import type { Bill } from '../types/types';

interface BillListProps{
    bills: Bill[];
  onSelectBill: (bill: Bill) => void;
}

const BillList: React.FC<BillListProps> = ({ bills, onSelectBill }) => {
  return (
    <div>
      <h2>Bill List</h2>
      <ul>
        {bills.map(bill => (
          <li key={bill.id} onClick={() => onSelectBill(bill)}>
            Bill № {bill.id}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BillList;
