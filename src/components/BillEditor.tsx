import { useState } from 'react'
import type { Bill } from '../types/types';

interface BillEditorProps {
  bill: Bill; // 1 props: приходящие данные 
  onSave: (updatedBill: Bill) => void; //функция, которую App передает TaskEditor нажата btn "Сохранить" 
  onCancel: () => void;
} 

const BillEditor: React.FC<BillEditorProps> = ({ bill }) => {
    //2 state: нужно хранить значения, которые пользователь вводит в поля формы
    const [billAmount, setBillAmount] = useState(bill.totalAmount);
    const [tipPercent, setTipPercent] = useState(bill.tipPercent);
    const [peopleCount, setpeopleCount] = useState(bill.peopleCount);


    //4 функции-обработчики
    const handleCancel = () => {
        onCancel();
    }
    
    //3: разметка
  return (
    <div>
      <h2>Bill #1</h2>
      <input
        type="text"
        value={billAmount}
        onChange={(e) => setBillAmount(Number(e.target.value))}/>

    </div>
    
    

   
  );
};

export default BillEditor;