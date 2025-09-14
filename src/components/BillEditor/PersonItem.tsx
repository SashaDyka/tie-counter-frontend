import React, { useState, useEffect } from 'react';
import type { Person } from '../../types/types'; 

interface PersonItemProps {
  person: Person;
  index: number;
  onUpdate: (index: number, updatedPerson: Person) => void;
}

const PersonItem: React.FC<PersonItemProps> = ({ person, index, onUpdate }) => {
  // Локальное состояние для управления полями ввода
  const [name, setName] = useState(person.name);
  const [tipPercent, setTipPercent] = useState(person.tipPercent);
  // isCustomAmount

  useEffect(() => {
    setName(person.name);
    setTipPercent(person.tipPercent);
  }, [person]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    // Отпр изменения наверх
    onUpdate(index, { ...person, name: newName });
  };

  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTipPercent = Number(e.target.value);
    setTipPercent(newTipPercent);
    // Отпр изменения наверх
    onUpdate(index, { ...person, tipPercent: newTipPercent });
  };

  return (
    <div>
      <label>
        Имя человека {index + 1}:
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      
      <label>
        Процент чаевых:
        <input
          type="number"
          value={tipPercent}
          onChange={handleTipChange}
        />
      </label>
      {/*  логикф для "своя сумма" */}
    </div>
  );
};

export default PersonItem;