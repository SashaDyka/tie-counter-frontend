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
        <span>Tip: {bill.tipPercent || 0}%</span>
        {bill.people && bill.people.length > 0 ? (
          <div>
            <span>People:</span>
            <ul className={styles.peopleList}>
              {bill.people.map(person => (
                <li key={person.id}>{person.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <span>People: None</span>
        )}
      </div>
    </li>
  );
};

export default BillListItem;