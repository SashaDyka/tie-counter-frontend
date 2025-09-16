import { useState, useEffect } from 'react'
import { fetchAllBills, saveBill, createBill, deleteBill } from './api/bills.service.ts';
import type { Bill } from './types/types'
import BillList from './components/BillList/BillList';
import BillEditor from './components/BillEditor/BillEditor';
import { useDispatch, useSelector } from 'react-redux';
import { setBills, selectBill, addBill, updateBill, deletedBill } from './features/bills/billsSlice';
import './styles.css';


function App() {
  const dispatch = useDispatch();
  const bills = useSelector(state => state.bills.bills);
  const selectedBill = useSelector(state => state.bills.selectedBill);

  useEffect(() => {
    const loadBills = async () => {
      try{
        const fetchedBills = await fetchAllBills();
      dispatch(setBills(fetchedBills));
      }catch(error) {
      console.error('Failed to fetch bills:', error);
    }
  };
    loadBills();
  }, []);


  const handleCreateBill = () => {
    const tempBill: Bill = {
      id: '',
      totalAmount: 0,
      tipPercent: 10,
      peopleCount: 1,
      people: [],
    };
    
    dispatch(selectBill(tempBill));
  };
  

  /*
  const createBill = async (newBillData: Bill) => {
    try {
      const createdBill = await createBill(newBillData);
      setBills(prevBills => [...prevBills, createdBill]);
      setSelectBill(createdBill);

    } catch (error) {
      console.error("Failed to create bill:", error);
    }
  };
  */

  /*
  const handleSaveBill = async (billToSave: Bill) => {
  try {
    let savedBill: Bill;
      if (!billToSave.id) {
      savedBill = await createBill(billToSave);
      setBills(prevBills => [...prevBills, savedBill]);
    } else {
      savedBill = await saveBill(billToSave);
      setBills(bills.map(b => (b.id === savedBill.id ? savedBill : b)));
    }
    setSelectBill(null);
  } catch (error) {
    console.error("Failed to save bill:", error);
  }
};
*/

  const handleCloseBill = () => {
    dispatch(selectBill(null));
  }
  
  const handleDeleteBill = async (id: string) => {
  try {
    await deleteBill(id);
    setBills(bills.filter(b => b.id !== id));
  } catch (error) {
    console.error("Failed to delete bill:", error);
  }
};
  

  return (
    <div>
      {selectedBill? (
        <BillEditor bill={selectedBill}
        onSave={handleCloseBill}
        onCancel={handleCloseBill} 
        onDelete={handleDeleteBill}/>
      ) : (
        <BillList bills ={bills} onSelectBill={(bill) => dispatch(selectBill(bill))} />
      )}
      <button className="button-create" onClick={handleCreateBill}>Create Bill</button>
    </div>
      
  )
}

export default App