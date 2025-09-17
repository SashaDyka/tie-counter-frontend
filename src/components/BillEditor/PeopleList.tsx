import React from 'react';
import type { Person } from '../../types/types'; 
import PersonItem from './PersonItem'; 
import styles from './PeopleList.module.css';

interface PeopleListProps {
    people: Person[]; 
    onUpdatePerson: (index: number, updatedPerson: Person) => void; 
}

const PeopleList: React.FC<PeopleListProps> = ({ people, onUpdatePerson }) => {

    console.log('PeopleList got people:', people);

  const handleUpdate = (index: number, updatedPerson: Person) => {
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