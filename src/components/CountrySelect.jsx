import React from 'react';

function CountrySelect({ value, onChange }) {
  return (
    <div>
      <p>Country</p>
      <select
       value={value.toUpperCase()}
       onChange={(e) => setFormData({ ...formData, country: e.target.value })}
       data-testid='country'
       >
        
      
        <option value='' data-testid='country-option-empty'>
          Select country
        </option>
        <option value='SPAIN' data-testid='spain'>
          SPAIN
        </option>
        <option value='ARGENTINA' data-testid='argentina'>
          ARGENTINA
        </option>
      </select>
    </div>
  );
}

export default CountrySelect;
