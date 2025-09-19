import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { BillUI, PersonUI } from "../../utils/mapper.toFrontend.ts";
import { calculateBillPreview } from "./../../utils/calculateBillPreview.ts";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";

import BillInput from "./BillInput";
import TipSelector from "./TipSelector";
import PeopleCountInput from "./PeopleCountInput";
import PeopleList from "./PeopleList";
import Results from "./Results";
import styles from "./BillEditor.module.css";

<<<<<<< HEAD


=======
>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
interface BillEditorProps {
  onSave: (updatedBill: BillUI) => void;
  onCancel: () => void;
  onUpdate?: (updatedBill: BillUI) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

<<<<<<< HEAD
=======

>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
const BillEditor: React.FC<BillEditorProps> = ({ onSave, onCancel, onDelete,}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
<<<<<<< HEAD
  const bill = useSelector((state: RootState) => state.bills.bills.find(b => b.id === Number(id)));
=======
  const bill = useSelector((state: RootState) =>
    state.bills.bills.find(b => b.id === Number(id))
  );
>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
  if (!bill) {
    return <p>Bill not found</p>;
  }

<<<<<<< HEAD
  const [billAmount, setBillAmount] = useState(bill.totalAmount);
  const [tipPercent, setTipPercent] = useState(bill.tipPercent);
  const [peopleCount, setPeopleCount] = useState(bill.peopleCount);
  const [people, setPeople] = useState<PersonUI[]>(bill.people.length ? bill.people : [], );
=======

  const [billAmount, setBillAmount] = useState(bill.totalAmount);
  const [tipPercent, setTipPercent] = useState(bill.tipPercent);
  const [peopleCount, setPeopleCount] = useState(bill.peopleCount);
  const [people, setPeople] = useState<PersonUI[]>(
    bill.people.length ? bill.people : [],
  );

>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
  const [totalTip, setTotalTip] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountPerPerson, setTotalAmountPerPerson] = useState(0);


  useEffect(() => {
    setBillAmount(bill.totalAmount);
    setTipPercent(bill.tipPercent);
    setPeopleCount(bill.peopleCount);

<<<<<<< HEAD

=======
>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
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
  }, [bill]);

<<<<<<< HEAD

  const recalculate = (amount: number, tip: number, currentPeople: PersonUI[], ) => {
=======
  const recalculate = (
    amount: number,
    tip: number,
    currentPeople: PersonUI[],
  ) => {
>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
    const result = calculateBillPreview(amount, tip, currentPeople);
    setTotalTip(result.tipAmount);
    setTotalAmount(result.totalWithTip);
    setTotalAmountPerPerson(
      currentPeople.length ? result.totalWithTip / currentPeople.length : 0,
    );
  };
<<<<<<< HEAD


  const handleTipPercentChange = (newTipPercent: number) => {
    setTipPercent(newTipPercent);
=======

  const handleTipPercentChange = (newTipPercent: number) => {
    setTipPercent(newTipPercent);

>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
    const updatedPeople = people.map((person) => ({
      ...person,
      individualTipPercentage: newTipPercent,
    }));
    setPeople(updatedPeople);

    recalculate(billAmount, newTipPercent, updatedPeople);
  };

<<<<<<< HEAD
  const updatePeopleArray = (currentPeople: PersonUI[], newCount: number, tipPercent: number,): PersonUI[] => {  
=======
  const updatePeopleArray = (
    currentPeople: PersonUI[],
    newCount: number,
    tipPercent: number,
  ): PersonUI[] => {
>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
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
          individualTipPercentage: tipPercent,
        });
      }
    }

    return newPeople;
  };

  const handlePeopleCountChange = (newCount: number) => {
    setPeopleCount(newCount);
    const updatedPeople = updatePeopleArray(people, newCount, tipPercent);
    setPeople(updatedPeople);
    recalculate(billAmount, tipPercent, updatedPeople);
  };

  const handleBillAmountChange = (newAmount: number) => {
    setBillAmount(newAmount);
    recalculate(newAmount, tipPercent, people);
  };

  const handleUpdatePerson = (index: number, updatedPerson: PersonUI) => {
    const updatedPeople = [...people];
    updatedPeople[index] = updatedPerson;
    setPeople(updatedPeople);

    const result = calculateBillPreview(billAmount, tipPercent, updatedPeople);

    setTotalTip(result.tipAmount);
    setTotalAmount(result.totalWithTip);
    setTotalAmountPerPerson(
      updatedPeople.length ? result.totalWithTip / updatedPeople.length : 0,
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
    navigate("/"); 
  };

  const handleReset = () => {
    setBillAmount(0);
    setTipPercent(0);
    setPeopleCount(1);
    setPeople([
      {
        id: 0,
        name: "Person 1",
        individualAmount: 0,
        individualTipPercentage: 0,
      },
    ]);
  };

  const handleCancel = () => {
<<<<<<< HEAD
    onCancel();
=======
>>>>>>> 89c7bfb593c5fded2553e48516b451209d80b107
    navigate("/"); 
  };

  const handleDelete = () => {
    if (bill.id !== 0) {
      onDelete(bill.id);
    }
    navigate("/"); 
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bill № {bill.id === 0 ? "New" : bill.id}</h2>
      <BillInput
        value={billAmount}
        onChange={setBillAmount}
        onBlur={() => handleBillAmountChange(billAmount)}
        onKeyDown={(e) =>
          e.key === "Enter" && handleBillAmountChange(billAmount)
        }
      />
      <TipSelector value={tipPercent} onChange={handleTipPercentChange} />
      <PeopleCountInput
        value={peopleCount}
        onChange={handlePeopleCountChange}
      />
      <PeopleList people={people} onUpdatePerson={handleUpdatePerson} />
      <Results
        tipAmount={totalTip}
        amountPerPerson={totalAmountPerPerson}
        totalAmound={totalAmount}
        people={people}
      />

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.save}`}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className={`${styles.button} ${styles.reset}`}
          onClick={handleReset}
        >
          Reset
        </button>
        {bill.id !== 0 && (
          <button
            className={`${styles.button} ${styles.delete}`}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        <button
          className={`${styles.button} ${styles.cancel}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BillEditor;
