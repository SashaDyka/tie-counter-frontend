import { useState, useEffect } from 'react';
import type { Bill, Person } from '../../types/types';
import BillInput from './BillInput';
import TipSelector from './TipSelector';
import PeopleCountInput from './PeopleCountInput';
import PeopleList from './PeopleList';
import Results from './Results';
import styles from './BillEditor.module.css';

interface BillEditorProps {  
  bill: Bill; 
  onSave: (updatedBill: Bill) => void; 
  onCancel: () => void;
  onUpdate?: (updatedBill: Bill) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const BillEditor: React.FC<BillEditorProps> = ({ bill, onSave, onCancel, onDelete }) => {
  const [billAmount, setBillAmount] = useState(bill.totalAmount);
  const [billAmountInput, setBillAmountInput] = useState(billAmount);
  const [tipPercent, setTipPercent] = useState(bill.tipPercent);
  const [peopleCount, setPeopleCount] = useState(bill.peopleCount);
  const [people, setPeople] = useState<Person[]>(bill.people || []);
  const [totalTip, setTotalTip] = useState<number>(0);
  const [totalAmountPerPerson, setTotalAmountPerPerson] = useState<number>(0);

  useEffect(() => {
    setBillAmount(bill.totalAmount);
    setBillAmountInput(bill.totalAmount);
    setTipPercent(bill.tipPercent);
    setPeopleCount(bill.peopleCount);
    setPeople(bill.people || []);    
    //console.log('People count:', peopleCount);
  }, [bill]);


  useEffect(() => {
    setPeople(prevPeople =>
      prevPeople.map(person => ({
        ...person,
        tipPercent: tipPercent,
      }))
    );

    handleRecalculate();
  }, [tipPercent]);


  const handleBillAmountChange = () => {
    const parsed = parseFloat(String(billAmountInput));
    if (!isNaN(parsed)) {
      setBillAmount(parsed);
      handleRecalculate(); 
    }
  };


  const handleTipPercentChange = (newTipPercent: number) => {
    setTipPercent(newTipPercent);
    const updatedPeople = people.map(person => ({
      ...person,
      tipPercent: newTipPercent,
    }));
    setPeople(updatedPeople);
    handleRecalculate();
  };


  const handleRecalculate = () => {
    const calculatedTip = billAmount * (tipPercent / 100);
    setTotalTip(calculatedTip);

    const totalAmountWithTip = billAmount + calculatedTip;
    const calculatedAmountPerPerson =
      peopleCount > 0 ? totalAmountWithTip / peopleCount : 0;
    setTotalAmountPerPerson(calculatedAmountPerPerson);
  };


  const updatePeopleArray = (currentPeople: Person[], newCount: number, tipPercent: number): Person[] => {
    const newPeople = [];

    for (let i = 0; i < newCount; i++) {
      if (currentPeople[i]) {
        newPeople.push({
          ...currentPeople[i],
          tipPercent: tipPercent,
        });
      } else {
        newPeople.push({
          id: Date.now() + i, 
          name: `Person ${i + 1}`,
          tipPercent: tipPercent,
          tipAmount: 0,
        });
      }
    }
    return newPeople;
  };

  const handlePeopleCountChange = (newCount: number) => {
    setPeopleCount(newCount);
    const updatedPeople = updatePeopleArray(people, newCount, tipPercent);
    setPeople(updatedPeople);
    handleRecalculate();
  };

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
    setPeople([{ id: 0, name: 'Person 1', tipPercent: 0, tipAmount: 0 }]);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDelete = () => {
    if (bill.id !== 0) {
      onDelete(bill.id);
    }
  };

    console.log('BillEditor send tipAmound', bill);


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bill № {bill.id === 0 ? 'New' : bill.id}</h2>
      <BillInput value={billAmountInput} onChange={setBillAmountInput} onBlur={handleBillAmountChange}
        onKeyDown={(e) => e.key === 'Enter' && handleRecalculate()} />
      <TipSelector value={tipPercent} onChange={handleTipPercentChange}  />
      <PeopleCountInput value={peopleCount} onChange={handlePeopleCountChange} />
      <PeopleList people={people} onUpdatePerson={handleUpdatePerson} />
      <Results
        tipAmount={totalTip}
        amountPerPerson={totalAmountPerPerson}
        people={people}
      />

      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.save}`} onClick={handleSave}>Save</button>
        <button className={`${styles.button} ${styles.reset}`} onClick={handleReset}>Reset</button>
        {bill.id !== 0 && (
          <button className={`${styles.button} ${styles.delete}`} onClick={handleDelete}>Delete</button>
        )}
        <button className={`${styles.button} ${styles.cancel}`} onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default BillEditor;
