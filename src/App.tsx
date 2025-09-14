import { useState } from 'react'
import type { Bill } from './types/types'
import BillList from './components/BillList';
import BillEditor from './components/BillEditor/BillEditor';
import './style.css'

function App() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectBill, setSelectBill] = useState<Bill | null>(null);

  const createBill = () => {
    const tempBill: Bill = {
      id: 'temp-1',
      totalAmount: 8,
      tipPercent: 5,
      peopleCount: 1,
      people: [],
    };
    
    setSelectBill(tempBill);
  };
  
  const closeBill = () => {
    setSelectBill(null);
  }
  
  

  return (
    <div>
      <h1>Tie counter</h1>
      <button onClick={createBill}>Create Bill</button>
      {selectBill? (
        <BillEditor bill={selectBill}
        onSave={closeBill}
        onCancel={closeBill} />
      ) : (
        <BillList bills ={bills} onSelectBill = {setSelectBill} />
      )}
      
    </div>
      
  )
}

export default App