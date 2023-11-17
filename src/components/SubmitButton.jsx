import React from 'react';

function SubmitButton({ onClick }) {
  return (
    <button
      type='submit'
      data-testid='submit-button'
      className='submit'
      onClick={onClick}
    >
      Submit
    </button>
  );
}

export default SubmitButton;