import React from 'react';

interface BillInputProps {
    value: number;
    onChange: (value: number) => void;
}

const BillInput: React.FC<BillInputProps> = ({ value, onChange }) => {

  return (
    <div>
      <label>Bill summ: </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
export default BillInput;