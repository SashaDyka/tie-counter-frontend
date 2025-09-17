import React from 'react';
import styles from './BillEditor.module.css';


interface TipSelectorProps {
    value: number;
    onChange: (value: number) => void;
    onBlur?: () => void;              
    onKeyDown?: (e: React.KeyboardEvent) => void;
}

const TipSelector: React.FC<TipSelectorProps> = ({ value, onChange, onBlur, onKeyDown }) => {
    const options = [5, 10, 15];

  return (
     <div>
        <label className={styles.label}>Select the tip percentage: </label>
        <div className={styles.tipButtons}> 
            {options.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    onBlur={onBlur} 
                    onKeyDown={onKeyDown}
                    className={p === value ? 'selected' : ''} >
                    {p}%
                </button>
            ))}
        </div>
    </div>
  );
}
export default TipSelector;