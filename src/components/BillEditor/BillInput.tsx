import React from 'react';
import styles from './BillEditor.module.css';

interface BillInputProps {
    value: number;
    onChange: (value: number) => void;
}

const BillInput: React.FC<BillInputProps> = ({ value, onChange }) => {

  return (
    <div>
      <label className={styles.label}>Bill summ: </label>
      <input
        className={styles.input}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
export default BillInput;