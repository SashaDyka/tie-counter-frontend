import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { BillUI } from '../../utils/mapper.toFrontend.ts';
import BillListItem from './BillListItem';
import styles from './BillList.module.css';


interface BillListProps{
  bills: BillUI[];
  onSelectBill: (bill: BillUI) => void;
  loading?: boolean;
}

const BillList: React.FC<BillListProps> = ({ bills, onSelectBill }) => {
  if (!Array.isArray(bills)) {
    console.error('Bills is not an array:', bills);
    return <p>Error loading bills. Please try again later.</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Your Bills</h2>
      {bills.length === 0 ? (
        <p>No bills found. Create a new one to get started!</p>
      ) : (
        <ul className={styles.list}>
          {bills.map((bill) => (
            <BillListItem
              key={bill.id}
              bill={bill}
              onSelectBill={onSelectBill}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default BillList;
