import React, { useState } from 'react';
import type { Person } from '../../types/types'; 
import styles from './PersonItem.module.css';

interface PersonItemProps {
  person: Person;
  index: number;
  onUpdate: (index: number, updatedPerson: Person) => void;
}

const PersonItem: React.FC<PersonItemProps> = ({ person, index, onUpdate }) => {
  const [name, setName] = useState(person.name || '');
  const [tipPercent, setTipPercent] = useState(person.tipPercent || 0);
  const [tipAmount, setTipAmount] = useState(person.tipAmount || 0);
  const [customAmount, setCustomAmount] = useState(false);

  const handleUpdate = () => {
    onUpdate(index, {
      ...person,
      name,
      tipPercent: customAmount ? null : tipPercent,
      tipAmount: customAmount ? tipAmount : null,
    });
  };

  const handleToggleTipType = () => {
    const newCustomAmount = !customAmount;
    setCustomAmount(newCustomAmount);
    if (newCustomAmount) {
      setTipPercent(0);
    } else {
      setTipAmount(0);
    }
  };

  return (
   <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Person name {index + 1}:
        </label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          {customAmount ? 'Your amount:' : 'Tip percentage'}:
        </label>
        <input
          className={styles.input}
          type="number"
          value={customAmount ? tipAmount : tipPercent}
          onChange={(e) => setTipPercent(Number(e.target.value))}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        />
      </div>
      <button className={styles.button} onClick={handleToggleTipType}>
        {customAmount ? 'Use %' : 'Use amount'}
      </button>
    </div>
  );
};


export default PersonItem;