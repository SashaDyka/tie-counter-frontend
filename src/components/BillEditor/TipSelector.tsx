import React from 'react';

interface TipSelectorProps {
    value: number;
    onChange: (value: number) => void;
}

const TipSelector: React.FC<TipSelectorProps> = ({ value, onChange }) => {
    const options = [5, 10, 15];

  return (
     <div>
        <label>Select the tip percentage: </label>
        <div> 
            {options.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={p === value ? 'selected' : ''} >
                    {p}%
                </button>
            ))}
        </div>
    </div>
  );
}
export default TipSelector;