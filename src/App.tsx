import { useState, useEffect } from 'react'
import { fetchAllBills, createBill, updateBill, deleteBill } from './api/bills.service.ts';
import type { Bill } from './types/types'
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

  useEffect(() => {
    const loadBills = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedBills = await fetchAllBills();

      const normalizedBills: Bill[] = fetchedBills.map((bill: any) => ({
        ...bill,
        tipPercent: bill.defaultTipPercentage ?? 0,
        peopleCount: bill.people?.length ?? 0,
        people: (bill.people || []).map((person: any) => ({
          ...person,
          tipPercent: person.individualTipPercentage ?? bill.defaultTipPercentage ?? 0,
          tipAmount: person.individualAmount ?? 0,
        })),
      }));

      dispatch(setBills(normalizedBills));
    } catch (error) {
      console.error('Failed to fetch bills:', error);
      setError('Can not fetch bills');
    } finally {
      setLoading(false);
    }
  };

  loadBills();
}, [dispatch]);


  const handleCreateBill = () => {
    const tempBill: Bill = {
      id: 0, 
      totalAmount: 0,
      tipPercent: 10,
      peopleCount: 1,
      people: [],
    };
    
    dispatch(selectBill(tempBill));
  };

  
  const transformToBackendFormat = (bill: Bill) => {
    return {
      totalAmount: bill.totalAmount,
      defaultTipPercentage: bill.tipPercent,
      people: bill.people.map(person => ({
        name: person.name,
        individualAmount: person.tipAmount ?? undefined,
        individualTipPercentage: person.tipPercent ?? undefined,
      })),
    };
  };

  const transformToFrontendFormat = (apiBill: any): Bill => {
    return {
      id: apiBill.id,
      totalAmount: apiBill.totalAmount,
      tipPercent: apiBill.defaultTipPercentage,
      peopleCount: apiBill.people.length,
      people: apiBill.people.map((person: any) => ({
        id: person.id,
        name: person.name,
        tipAmount: person.individualAmount ?? null,
        tipPercent: person.individualTipPercentage ?? null,
      }))
    };
  };


  const handleSaveBill = async (billToSave: Bill) => {
  console.log("✔️ Bill to save:", billToSave);
  setLoading(true);
  setError(null);
  try {
    const backendData = transformToBackendFormat(billToSave);
    console.log("Transformed to backend format:", backendData);

    if (billToSave.id === 0) {
      const createdBillFromApi = await createBill(backendData);
      console.log("Created bill from API:", createdBillFromApi);

      const createdBill = transformToFrontendFormat(createdBillFromApi);
      console.log("Created bill transformed to frontend:", createdBill);

      dispatch(addBill(createdBill));
    } else {
      const updatedBillFromApi = await updateBill(billToSave.id, backendData);
      console.log("Updated bill from API:", updatedBillFromApi);

      const updatedBill = transformToFrontendFormat(updatedBillFromApi);
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

  const handleUpdateBill = (updatedBill: Bill) => {
    dispatch(selectBill(updatedBill));
  };

  //console.log("Tip %:", bills);

  return (
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
      
      {selectedBill ? (
        <BillEditor 
          bill={selectedBill}
          onSave={handleSaveBill}
          onCancel={handleCloseBill} 
          onDelete={handleDeleteBill}
          onUpdate={handleUpdateBill}
          loading={loading}
        />
      ) : (
        <>
          <BillList 
            bills={bills} 
            onSelectBill={(bill) => dispatch(selectBill(bill))} 
            loading={loading}
          />
          <button 
            className="button-create" 
            onClick={handleCreateBill}
            disabled={loading}
          >
            Create Bill
          </button>
        </>
      )}
    </div>
  )
}

export default App