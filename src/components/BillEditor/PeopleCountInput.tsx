import React from "react";
import styles from "./BillEditor.module.css";

interface PeopleCountInputProps {
  value: number;
  onChange: (value: number) => void;
}

const PeopleCountInput: React.FC<PeopleCountInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label className={styles.label}>Amound of people:</label>
      <input
        className={styles.input}
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};
export default PeopleCountInput;
