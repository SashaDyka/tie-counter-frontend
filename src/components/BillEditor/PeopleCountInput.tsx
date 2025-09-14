import React from 'react';

interface PeopleCountInputProps {
    value: number;
    onChange: (value: number) => void;
}

const PeopleCountInput: React.FC<PeopleCountInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Amound of people:</label>
        <input
            type="number"
            min="1"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
        />
    </div>
  );
}
export default PeopleCountInput;