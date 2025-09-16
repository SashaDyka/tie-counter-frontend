import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { removeBill } from '../../features/bills/billsSlice';
import BillListItem from './BillListItem';
import styles from './BillList.module.css';


const BillListTest: React.FC = () => {
  const bills = useSelector((state: RootState) => state.bills.bills);
  const dispatch: AppDispatch = useDispatch();

  const handleRemoveBill = (id: string) => {
    dispatch(removeBill(id));
  };

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
              handleRemoveBill={handleRemoveBill}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default BillListTest;
