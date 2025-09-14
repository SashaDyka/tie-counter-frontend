import { useState, useEffect  } from 'react'
import type { Bill, Person } from '../../types/types';
import  BillInput from './BillInput'
import  TipSelector from './TipSelector'
import  PeopleCountInput from './PeopleCountInput'
import  PeopleList from './PeopleList'
import Results from './Results';


interface BillEditorProps {  
  bill: Bill; 
  onSave: (updatedBill: Bill) => void; 
  onCancel: () => void;
} 


const BillEditor: React.FC<BillEditorProps> = ({ bill, onSave, onCancel }) => {
    const [billAmount, setBillAmount] = useState(bill.totalAmount);
    const [tipPercent, setTipPercent] = useState(bill.tipPercent);
    const [peopleCount, setPeopleCount] = useState(bill.peopleCount);
    const [people, setPeople] = useState<Person[]>(bill.people);

    const [totalTip, setTotalTip] = useState<number>(0);
    const [totalAmountPerPerson, setTotalAmountPerPerson] = useState<number>(0);


    useEffect(() => {
      setBillAmount(bill.totalAmount);
      setTipPercent(bill.tipPercent);
      setPeopleCount(bill.peopleCount);
      setPeople(bill.people);
    }, [bill]);

    
    useEffect(() => {
      const calculatedTip = billAmount * (tipPercent / 100);
      setTotalTip(calculatedTip);
        
      const totalAmountWithTip = billAmount + calculatedTip;
      const calculatedAmountPerPerson = peopleCount > 0 ? totalAmountWithTip / peopleCount : 0;
      setTotalAmountPerPerson(calculatedAmountPerPerson);
    }, [billAmount, tipPercent, peopleCount]);


    useEffect(() => {
      const newPeople: Person[] = Array.from({ length: peopleCount }, (_, i) => {
        return people[i] || { id: `person-${i}`, name: `Person ${i + 1}`, tipPercent: tipPercent, tipAmount: 0 };
      });
      setPeople(newPeople);
    }, [peopleCount, tipPercent]);


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

   
    
  return (
    <div>
      <h2>Bill № {bill.id}</h2>
      <BillInput value={billAmount} onChange={setBillAmount} />
      <TipSelector value={tipPercent} onChange={setTipPercent} />
      <PeopleCountInput value={peopleCount} onChange={setPeopleCount} />
      <PeopleList people={people} onUpdatePerson={handleUpdatePerson}/>
      <Results
        tipAmount={totalTip}
        tipPercent={totalAmountPerPerson}
        people={people}
      />

      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleCancel}>Cancel</button>
      
    </div>
  );
};

export default BillEditor;