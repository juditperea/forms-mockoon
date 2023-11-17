import React from 'react';

function SurnameInput({ value, onChange }) {
  return (
    <div>
      <p>Surname</p>
      <input
        type='text'
        value={value.toUpperCase() || ''} 
        onChange={onChange}
        data-testid='surname'
      />
    </div>
  );
}

export default SurnameInput;
