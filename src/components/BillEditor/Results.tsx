import React from "react";
import type { PersonUI } from "../../utils/mapper.toFrontend.ts";
import styles from "./BillEditor.module.css";

interface ResultsProps {
  tipAmount: number;
  amountPerPerson: number;
  totalAmound: number;
  people: PersonUI[];
}

const Results: React.FC<ResultsProps> = ({
  tipAmount,
  totalAmound,
  people,
}) => {
  return (
    <div className={styles.resultsBox}>
      <h3>Results:</h3>
      <p className={styles.perPerson}>Tip amount: {tipAmount.toFixed(2)}</p>
      <p className={styles.totalTip}>Total amount: {totalAmound.toFixed(2)}</p>
      <p className={styles.perPerson}>How much each person pays: </p>

      <ul className={styles.personList}>
        {people.map((person) => {
          const tipAmount =
            person.individualAmount * (person.individualTipPercentage / 100);
          return (
            <div key={person.id}>
              {person.name}: {tipAmount.toFixed(2)}
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default Results;
