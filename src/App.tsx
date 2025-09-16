import { useState, useEffect } from 'react'
import { fetchAllBills, saveBill, createBill } from './api/bills.service.ts';
import type { Bill } from './types/types'
import BillList from './components/BillList/BillList';
import BillEditor from './components/BillEditor/BillEditor';
import './styles.css';


function App() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectBill, setSelectBill] = useState<Bill | null>(null);

  useEffect(() => {
    const loadBills = async () => {
      try{
        const fetchedBills = await fetchAllBills();
      setBills(fetchedBills);
      }catch(error) {
      console.error('Failed to fetch bills:', error);
    }
  };
    loadBills();
  }, []);
  



  const handleSaveBill = async (updatedBill: any) => {
    const savedBill = await saveBill(updatedBill);
    setBills(bills.map(b => (b.id === savedBill.id ? savedBill : b)));
    setSelectBill(null);
  };

  const createBill = () => {
    const tempBill: Bill = {
      id: '',
      totalAmount: 0,
      tipPercent: 10,
      peopleCount: 1,
      people: [],
    };
    
    setSelectBill(tempBill);
  };
  

 /* const createBill = async (newBillData: Bill) => {
    try {
      const createdBill = await createBill(newBillData);
      setBills(prevBills => [...prevBills, createdBill]);
      setSelectBill(createdBill);

    } catch (error) {
      console.error("Failed to create bill:", error);
    }
  };
  */

  const closeBill = () => {
    setSelectBill(null);
  }
  
  

  return (
    <div>
      {selectBill? (
        <BillEditor bill={selectBill}
        onSave={handleSaveBill}
        onCancel={closeBill} />
      ) : (
        <BillList bills ={bills} onSelectBill = {setSelectBill} />
      )}
      <button className="button-create" onClick={createBill}>Create Bill</button>
    </div>
      
  )
}

export default App