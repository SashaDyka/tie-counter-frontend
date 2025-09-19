import React from "react";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { selectBill } from "../../features/bills/billsSlice";
import type { RootState } from "../../app/store";

import type { BillUI } from "../../utils/mapper.toFrontend.ts";
import BillListItem from "./BillListItem";
import styles from "./BillList.module.css";

interface BillListProps {
=======
import { Link, useNavigate } from "react-router-dom";
import type { BillUI } from "../../utils/mapper.toFrontend.ts";
import BillListItem from "./BillListItem";
import styles from "./BillList.module.css";

interface BillListProps {
  bills: BillUI[];
  onSelectBill: (bill: BillUI) => void;
>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
  loading?: boolean;
}

const BillList: React.FC<BillListProps> = ({ }) => {
  const dispatch = useDispatch();
  const bills = useSelector((state: RootState) => state.bills.bills);
  const selectedBill = useSelector((state: RootState) => state.bills.selectedBill);

  console.log("Bills from store:", bills);

  if (!Array.isArray(bills)) {
    console.error("Bills is not an array:", bills);
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
              isSelected={selectedBill?.id === bill.id}
              onSelectBill={() => dispatch(selectBill(bill))}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default BillList;
