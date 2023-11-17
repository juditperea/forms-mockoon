import React from 'react';

function StreetInput({ value, onChange }) {
  return (
    <div>
      <p>Street</p>
      <input
        type='text'
        value={value ? value.toUpperCase() : ''}
        onChange={onChange}
        data-testid='street'
      />
    </div>
  );
}

export default StreetInput;
