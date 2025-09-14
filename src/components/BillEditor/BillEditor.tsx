import { useState, useEffect  } from 'react'
import type { Bill } from '../../types/types';
import  BillInput from './BillInput'
import  TipSelector from './TipSelector'
import  PeopleCountInput from './PeopleCountInput'
import  PeopleList from './PeopleList'



interface BillEditorProps {  
  bill: Bill; 
  onSave: (updatedBill: Bill) => void; 
  onCancel: () => void;
} 


const BillEditor: React.FC<BillEditorProps> = ({ bill, onSave, onCancel }) => {
    const [billAmount, setBillAmount] = useState(bill.totalAmount);
    const [tipPercent, setTipPercent] = useState(bill.tipPercent);
    const [peopleCount, setPeopleCount] = useState(bill.peopleCount);
    const [people, setPeople] = useState(bill.people);

    useEffect(() => {
      setBillAmount(bill.totalAmount);
      setTipPercent(bill.tipPercent);
      setPeopleCount(bill.peopleCount);
      setPeople(bill.people);
    }, [bill]);


    //TODO: Write correct methods processors
    const handleSave = () => {
      const updatedBill = {
        ...bill,
        totalAmount: billAmount,
        tipPercent: tipPercent,
        peopleCount: peopleCount,
        people: people,
      };
      onSave(updatedBill);
    };

    const handleCancel = () => {
        onCancel();
    }

    const handleUpdatePerson = () => {
        onCancel();
    }
    
  return (
    <div>
      <h2>Bill № {bill.id}</h2>
      <BillInput value={billAmount} onChange={setBillAmount} />
      <TipSelector value={tipPercent} onChange={setTipPercent} />
      <PeopleCountInput value={peopleCount} onChange={setPeopleCount} />
      <PeopleList people={people} onUpdatePerson={handleUpdatePerson}/>
      

      
    </div>
  );
};

export default BillEditor;

//<Results results={results} />