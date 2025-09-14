import React from 'react';
import type { Person } from '../../types/types'; 
import styles from './BillEditor.module.css';

interface ResultsProps {
    tipAmount: number; 
    tipPercent: number;
    people: Person[];
}

const Results: React.FC<ResultsProps> = ({ tipAmount, tipPercent, people }) => {

  return (
    <div className={styles.resultsBox}>
      <h3>Results:</h3>
      <p className={styles.perPerson}>Tip amount: {tipAmount.toFixed(2)}</p>
      <p className={styles.totalTip}>Total amount: {tipPercent.toFixed(2)}</p>
      <p className={styles.perPerson}>How much each person pays: </p>
      
      <ul className={styles.personList}>
        {people.map((person, index) => (
          <li key={index}>
            {person.name}: {person.tipAmount ? person.tipAmount.toFixed(2) : tipPercent.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Results;