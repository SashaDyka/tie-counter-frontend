import React from 'react';
import type { Person } from '../../types/types'; 

interface ResultsProps {
    tipAmount: number; 
    tipPercent: number;
    people: Person[];
}

const Results: React.FC<ResultsProps> = ({ tipAmount, tipPercent, people }) => {

  return (
    <div>
      <h3>Results:</h3>
      <p>Tip amount: {tipAmount.toFixed(2)}</p>
      <p>Total amount: {tipPercent.toFixed(2)}</p>
      <p>How much each person pays: </p>
      <ul>
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