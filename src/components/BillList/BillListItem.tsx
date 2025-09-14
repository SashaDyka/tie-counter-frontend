import React from 'react';
import type { Bill } from '../../types/types';
import styles from './BillListItem.module.css';


interface BillListItemProps {
  bill: Bill;
  onSelectBill: (bill: Bill) => void;
}

const BillListItem: React.FC<BillListItemProps> = ({ bill, onSelectBill }) => {
  const handleClick = () => {
    onSelectBill(bill);
  };

  return (
    <li className={styles.item} onClick={handleClick}>
      <div className={styles.info}>
        <span>Bill #{bill.id}</span>
        <span>Total: ${bill.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.details}>
        <span>Tip: {bill.tipPercent}%</span>
        <span>People: {bill.peopleCount}</span>
      </div>
    </li>
  );
};

export default BillListItem;