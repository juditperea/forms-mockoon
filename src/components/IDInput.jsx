import React from 'react';

function IDInput({ value, onChange, idAlert }) {
  return (
    <div>
      <p>ID</p>
      <input
        type='text'
        value={value ? value.toUpperCase() : ''}
        onChange={onChange}
        data-testid='id'
      />
      <p className='message-error'>{idAlert}</p>
    </div>
  );
}

export default IDInput;
