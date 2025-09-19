import React from 'react';
import type { PersonUI } from '../../utils/mapper.toFrontend.ts';
import PersonItem from './PersonItem'; 
import styles from './PeopleList.module.css';

interface PeopleListProps {
    people: PersonUI[]; 
    onUpdatePerson: (index: number, updatedPerson: PersonUI) => void; 
}

const PeopleList: React.FC<PeopleListProps> = ({ people, onUpdatePerson }) => {

  const handleUpdate = (index: number, updatedPerson: PersonUI) => {
    onUpdatePerson(index, updatedPerson);
  };
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>People:</h3>
      <div className={styles.list}>
        {people.map((person, i) => (
          <PersonItem
            key={person.id} 
            index={i}
            person={person}
            onUpdate={handleUpdate} 
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleList;