import React, { useState } from "react";
import type { PersonUI } from "../../utils/mapper.toFrontend.ts";
import styles from "./PersonItem.module.css";

interface PersonItemProps {
  person: PersonUI;
  index: number;
  onUpdate: (index: number, updatedPerson: PersonUI) => void;
}

const PersonItem: React.FC<PersonItemProps> = ({ person, index, onUpdate }) => {
  const [name, setName] = useState(person.name || "");
  const [tipPercent, setTipPercent] = useState(person.tipPercent || 0);
  const [tipAmount, setTipAmount] = useState(person.tipAmount || 0);
  const [customAmount, setCustomAmount] = useState(false);

  const handleUpdate = () => {
    onUpdate(index, {
      ...person,
      name,
      tipPercent: customAmount ? null : tipPercent,
      tipAmount: customAmount ? tipAmount : null,
    });
  };

  const handleToggleTipType = () => {
    const newCustomAmount = !customAmount;
    setCustomAmount(newCustomAmount);

    if (newCustomAmount) {
      setTipAmount(0);
    } else {
      setTipPercent(0);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Person name {index + 1}:</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          {customAmount ? "Your amount:" : "Tip percentage"}:
        </label>
        <input
          className={styles.input}
          type="number"
          value={customAmount ? tipAmount : tipPercent}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (customAmount) {
              setTipAmount(val);
            } else {
              setTipPercent(val);
            }
          }}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        />
      </div>
      <button className={styles.button} onClick={handleToggleTipType}>
        {customAmount ? "Use %" : "Use amount"}
      </button>
    </div>
  );
};

export default PersonItem;
