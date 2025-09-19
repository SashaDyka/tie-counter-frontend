import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { BillUI, PersonUI } from '../../utils/mapper.toFrontend.ts';
import { calculateBillPreview } from './../../utils/calculateBillPreview.ts';

import BillInput from './BillInput';
import TipSelector from './TipSelector';
import PeopleCountInput from './PeopleCountInput';
import PeopleList from './PeopleList';
import Results from './Results';
import styles from './BillEditor.module.css';



interface BillEditorProps {  
  bill: BillUI; 
  onSave: (updatedBill: BillUI) => void; 
  onCancel: () => void;
  onUpdate?: (updatedBill: BillUI) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const BillEditor: React.FC<BillEditorProps> = ({ bill, onSave, onCancel, onDelete }) => {
  const [billAmount, setBillAmount] = useState(bill.totalAmount);
  const [tipPercent, setTipPercent] = useState(bill.tipPercent);
  const [peopleCount, setPeopleCount] = useState(bill.peopleCount);
  const [people, setPeople] = useState<PersonUI[]>(bill.people || []); 
  
  const [totalTip, setTotalTip] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountPerPerson, setTotalAmountPerPerson] = useState(0);
  const [billAmountInput, setBillAmountInput] = useState(String(bill.totalAmount));
  

  const initializeFromBill = (bill: BillUI) => {
    setBillAmount(bill.totalAmount);
    setTipPercent(bill.tipPercent);
    setPeopleCount(bill.peopleCount);

    if (bill.people.length) {
        setPeople(bill.people);
      } else {
        const newPeople = Array.from({ length: bill.peopleCount }, (_, i) => ({
          id: Date.now() + i,
          name: `Person ${i + 1}`,
          individualAmount: 0, 
          individualTipPercentage: bill.tipPercent, 
        }));
        setPeople(newPeople);
      }
  };

  useEffect(() => {
    if (bill) {
      initializeFromBill(bill);
    }
  }, [bill]);


  useEffect(() => {
    setPeople(prevPeople =>
      prevPeople.map(person => ({
        ...person,
        individualTipPercentage: tipPercent, 
      }))
    );

    const result = calculateBillPreview(
      billAmount,
      tipPercent,
      people.map(person => ({
        ...person,
        individualTipPercentage: tipPercent,
      }))
    );

    setTotalTip(result.tipAmount);
    setTotalAmount(result.totalWithTip);
    setTotalAmountPerPerson(
      people.length ? result.totalWithTip / people.length : 0
    );
  }, [tipPercent]);


  const handleTipPercentChange = (newTipPercent: number) => {
    setTipPercent(newTipPercent);

    const updatedPeople = people.map(person => ({
      ...person,
      individualTipPercentage: newTipPercent, 
    }));
    setPeople(updatedPeople);

    const result = calculateBillPreview(
      billAmount,           
      newTipPercent,        
      updatedPeople         
    );

    setTotalTip(result.tipAmount);
    setTotalAmount(result.totalWithTip);
    setTotalAmountPerPerson(
      billAmount && people.length ? result.totalWithTip / people.length : 0
    );
};


  const updatePeopleArray = (
    currentPeople: PersonUI[],
    newCount: number,
    tipPercent: number
  ): PersonUI[] => {
    const newPeople: PersonUI[] = [];

    for (let i = 0; i < newCount; i++) {
      if (currentPeople[i]) {
        newPeople.push({
          ...currentPeople[i],
          individualTipPercentage: tipPercent, 
        });
      } else {
        newPeople.push({
          id: Date.now() + i,
          name: `Person ${i + 1}`,
          individualAmount: 0,                
          individualTipPercentage: tipPercent 
        });
      }
    }

    return newPeople;
  };

  const handlePeopleCountChange = (newCount: number) => {
  setPeopleCount(newCount);

  const updatedPeople: PersonUI[] = updatePeopleArray(people, newCount, tipPercent);
    setPeople(updatedPeople);

    const result = calculateBillPreview(
      billAmount,        
      tipPercent,        
      updatedPeople     
    );

    setTotalTip(result.tipAmount);
    setTotalAmount(result.totalWithTip);
    setTotalAmountPerPerson(
      newCount > 0 ? result.totalWithTip / newCount : 0
    );
  };


  const handleSave = () => {
    const updatedBill: BillUI = {
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
    setPeople([{ id: 0, name: 'Person 1', individualAmount: 0, individualTipPercentage: 0}]);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDelete = () => {
    if (bill.id !== 0) {
      onDelete(bill.id);
    }
  };


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
        totalAmound={totalAmount}
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
