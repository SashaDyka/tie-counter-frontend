import React, { useState, useEffect } from 'react';
import type { Person } from '../../types/types'; 

interface PersonItemProps {
  person: Person;
  index: number;
  onUpdate: (index: number, updatedPerson: Person) => void;
}

const PersonItem: React.FC<PersonItemProps> = ({ person, index, onUpdate }) => {
  const [name, setName] = useState(person.name);
  const [tipPercent, setTipPercent] = useState(person.tipPercent);
  const [tipAmount, setTipAmount] = useState(person.tipAmount || 0);
  const [customAmount, setCustomAmount] = useState(false);

  useEffect(() => {
    setName(person.name);
    setTipPercent(person.tipPercent);
  }, [person]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    onUpdate(index, { ...person, name: newName });
  };

  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTipValue = Number(e.target.value);
    
    if (customAmount) {
      setTipAmount(newTipValue);
      onUpdate(index, { ...person, tipAmount: newTipValue, tipPercent: 0 }); 
    } else {
      setTipPercent(newTipValue);
      onUpdate(index, { ...person, tipPercent: newTipValue, tipAmount: 0 });
    }
  };


  const handleToggleTipType = () => {
    setCustomAmount(!customAmount);
    if (customAmount) {
      setTipAmount(0);
      onUpdate(index, { ...person, tipAmount: 0 });
    } else {
      setTipPercent(0);
      onUpdate(index, { ...person, tipPercent: 0 });
    }
  };


  return (
    <div>
      <label>
        Person name {index + 1}:
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      
      <label>
        {customAmount ? 'Your amount' : 'Tip percentage'}:
        <input
          type="number"
          value={customAmount ? tipAmount : tipPercent}
          onChange={handleTipChange}
        />
      </label>
      <button onClick={handleToggleTipType}>
        {customAmount ? 'Use %' : 'Use amount'}
      </button>
    </div>
  );
};


export default PersonItem;