import { useState } from 'react'
import type { Bill, Person } from './types/types'
import BillList from './components/BillList';
import BillEditor from './components/BillEditor';
import './style.css'

function App() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectBill, setSelectBill] = useState<Bill | null>(null);

  const createBill = () => {
    const tempBill: Bill = {
      id: 'temp-123',
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
      
      {selectBill? (
        <BillEditor bill={selectBill} />
      ) : (
        <BillList bills ={bills} onSelectBill = {setSelectBill} />
      )}
      
      <button onClick={createBill}>Create Bill</button>
      <button onClick={closeBill}>Close</button>

    </div>
      
  )
}

export default App