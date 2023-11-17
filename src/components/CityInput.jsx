import React from 'react';

function CityInput({ value, onChange }) {
  return (
    <div>
      <p>City</p>
      <input
        type='text'
        value={value ? value.toUpperCase() : ''}
        onChange={onChange}
        data-testid='city'
      />
    </div>
  );
}

export default CityInput;
