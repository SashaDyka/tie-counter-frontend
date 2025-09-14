import React from 'react';
import type { Bill } from '../types/types';

interface BillEditorProps {
  bill: Bill;
} 

const BillEditor: React.FC<BillEditorProps> = ({ bill }) => {
  return (
    <div>
      <h2>Edit bill: {bill.id}</h2>
    </div>
  );
};

export default BillEditor;