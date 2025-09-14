import React from 'react';
import type { Person } from '../../types/types'; 
import PersonItem from './PersonItem';

interface PeopleListProps {
    people: Person[]; 
    onUpdatePerson: (index: number, updatedPerson: Person) => void; 
}

const PeopleList: React.FC<PeopleListProps> = ({ people, onUpdatePerson }) => {

  const handleUpdate = (index: number, updatedPerson: Person) => {
    onUpdatePerson(index, updatedPerson);
  };
  
  return (
    <div>
      <h3>People:</h3>
      {people.map((person, i) => (
        <PersonItem
          key={person.id} 
          index={i}
          person={person}
          onUpdate={handleUpdate} 
        />
      ))}
    </div>
  );
};

export default PeopleList;