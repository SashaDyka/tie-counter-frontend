import { useState, useEffect  } from 'react'
import type { Bill, Person } from '../../types/types';
import  BillInput from './BillInput'
import  TipSelector from './TipSelector'
import  PeopleCountInput from './PeopleCountInput'
import  PeopleList from './PeopleList'
import Results from './Results';
import styles from './BillEditor.module.css';



interface BillEditorProps {  
  bill: Bill; 
  onSave: (updatedBill: Bill) => void; 
  onCancel: () => void;
  onDelete: (id: string) => void;
} 


const BillEditor: React.FC<BillEditorProps> = ({ bill, onSave, onCancel }) => {
    const [billAmount, setBillAmount] = useState(bill.totalAmount);
    const [tipPercent, setTipPercent] = useState(bill.tipPercent);
    const [peopleCount, setPeopleCount] = useState(bill.peopleCount);
    const [people, setPeople] = useState<Person[]>(bill.people || []);
    const [totalTip, setTotalTip] = useState<number>(0);
    const [totalAmountPerPerson, setTotalAmountPerPerson] = useState<number>(0);


    useEffect(() => {
      setBillAmount(bill.totalAmount);
      setTipPercent(bill.tipPercent);
      setPeopleCount(bill.peopleCount);
      setPeople(bill.people || []);
    }, [bill]);

    
    useEffect(() => {
      const calculatedTip = billAmount * (tipPercent / 100);
      setTotalTip(calculatedTip);
      const totalAmountWithTip = billAmount + calculatedTip;
      const calculatedAmountPerPerson = peopleCount > 0 ? totalAmountWithTip / peopleCount : 0;
      setTotalAmountPerPerson(calculatedAmountPerPerson);
    }, [billAmount, tipPercent, peopleCount]);


    useEffect(() => {
      const newPeople = Array.from({ length: peopleCount }, (_, i) => {
        const existingPerson = people[i];
      if (existingPerson) {
        return {
          ...existingPerson,
          individualTipPercentage: tipPercent,
      };
        } else {
          return {
            id: `person-${i}`,
            name: `Person ${i + 1}`,
            tipPercent: tipPercent, 
            tipAmount: null,
          };
        }
      });
      setPeople(newPeople);
    }, [peopleCount, tipPercent, people]);

    const handleUpdatePerson = (index: number, updatedPerson: Person) => {
      const newPeople = [...people];
      newPeople[index] = updatedPerson;
      setPeople(newPeople);
    };

    const handleSave = () => {
      const updatedBill: Bill = {
        ...bill,
        totalAmount: billAmount,
        tipPercent: tipPercent,
        peopleCount: peopleCount,
        people: people,
      };
      onSave(updatedBill);
    };

     const handleReset = () => {
      setBillAmount(0);
      setTipPercent(0);
      setPeopleCount(1);
      setPeople([{ id: 'person-0', name: 'Person 1', tipPercent: 10, tipAmount: 0  }]);
    };
    

    const handleCancel = () => {
      onCancel();
    }

    console.log('BillEditor passes to PeopleList:', people); //test people 
   
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bill № {bill.id}</h2>
      <BillInput value={billAmount} onChange={setBillAmount} />
      <TipSelector value={tipPercent} onChange={setTipPercent} />
      <PeopleCountInput value={peopleCount} onChange={setPeopleCount} />
      <PeopleList people={people} onUpdatePerson={handleUpdatePerson}/>
      <Results
        tipAmount={totalTip}
        tipPercent={totalAmountPerPerson}
        people={people}
      />

      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.save}`} onClick={handleSave}>Save</button>
        <button className={`${styles.button} ${styles.reset }`} onClick={handleReset}>Reset</button>
        <button onClick={() => onDelete(bill.id)}>Delete</button>
        <button className={`${styles.button} ${styles.cancel }`} onClick={handleCancel}>Cancel</button>
      </div>
      
    </div>
  );
};

export default BillEditor;