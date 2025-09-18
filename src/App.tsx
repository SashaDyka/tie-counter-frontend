import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import { fetchAllBills, createBill, updateBill, deleteBill } from './api/bills.service.ts';
import { mapBillFromApi, type BillUI } from './utils/mapper.toFrontend.ts';
import { mapBillToApi,  } from './utils/mapper.toBackend.ts';
import { useOnce } from './utils/hooks/useOnce.ts';
import BillList from './components/BillList/BillList';
import BillEditor from './components/BillEditor/BillEditor';

import { useDispatch, useSelector } from 'react-redux';
import { setBills, selectBill, addBill, updateBillInStore, deletedBill } from './features/bills/billsSlice';
import type { RootState } from './app/store'; 
import './styles.css';



function App() {
  const dispatch = useDispatch();
  const bills = useSelector((state: RootState) => state.bills.bills);
  const selectedBill = useSelector((state: RootState) => state.bills.selectedBill);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


    const loadBills = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedBills = await fetchAllBills();
        const normalizedBills = fetchedBills.map(mapBillFromApi);
        dispatch(setBills(normalizedBills));
      } catch (error) {
        console.error('Failed to fetch bills:', error);
        setError('Can not fetch bills');
      } finally {
        setLoading(false);
      }
    };

    useOnce(() => {
      loadBills();
    });


  const handleCreateBill = () => {
    const tempBill: BillUI = {
      id: 0, 
      totalAmount: 0,
      tipPercent: 0,
      peopleCount: 0,
      people: [],
    };
    
    dispatch(selectBill(tempBill));
  };


//status code: 500
  const handleSaveBill = async (billToSave: BillUI) => {
    console.log("✔️ Bill to save:", billToSave);
    setLoading(true);
    setError(null);
    try {
      const backendData = mapBillToApi(billToSave);
      console.log("Transformed to backend format:", backendData);

      if (billToSave.id === 0) {
        const createdBillFromApi = await createBill(backendData);
        console.log("Created bill from API:", createdBillFromApi);

        const createdBill = mapBillFromApi(createdBillFromApi);
        console.log("Created bill transformed to frontend:", createdBill);

        dispatch(addBill(createdBill));
      } else {
        const updatedBillFromApi = await updateBill(billToSave.id, backendData);
        console.log("Updated bill from API:", updatedBillFromApi);

        const updatedBill = mapBillFromApi(updatedBillFromApi);
        console.log("Updated bill transformed to frontend:", updatedBill);

        dispatch(updateBillInStore(updatedBill));
      }

      dispatch(selectBill(null));
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || 'Error saving bill';
      console.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };



  const handleDeleteBill = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this bill?')) {
    return;
    }
    setLoading(true);
    setError(null);
    try {
      await deleteBill(id);
      dispatch(deletedBill(id));
      if (selectedBill?.id === id) {
        dispatch(selectBill(null));
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || 'Error deleting bill';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseBill = () => {
    dispatch(selectBill(null));
  };

  const handleUpdateBill = (updatedBill: BillUI) => {
    dispatch(selectBill(updatedBill));
  };

  console.log("Tip % in App:", bills);

  return (
    <BrowserRouter>
    <div>
      {error && (
        <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
          {error}
        </div>
      )}
      
      {loading && (
        <div className="loading" style={{ margin: '10px 0' }}>
          Loading...
        </div>
      )}
      
    
    
    <Routes>
      <Route path="/" element={<BillList bills={bills} //TODO: BillList must be subscribed to bills from the store. 
        onSelectBill={(bill) => dispatch(selectBill(bill))} 
        loading={loading}/>} />

      <Route path="/bills/:id" element={<BillEditor bill={selectedBill}
        onSave={handleSaveBill}
        onCancel={handleCloseBill} 
        onDelete={handleDeleteBill}
        onUpdate={handleUpdateBill}
        loading={loading}/>} />
        
      <Route path="/bills/create" element={<BillEditor bill={selectedBill}
        onSave={handleSaveBill}
        onCancel={handleCloseBill} 
        onDelete={handleDeleteBill}
        onUpdate={handleUpdateBill}
        loading={loading}/>} />    
    </Routes>

     <>
      <button 
        className="button-create" 
        onClick={handleCreateBill}
        disabled={loading}
      >
        Create Bill
      </button>
      </>

    </div>
    </BrowserRouter>
  )
}

export default App