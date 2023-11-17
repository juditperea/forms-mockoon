import React from 'react';
function ClearButton({ onClick }) {
    return (
      <button
        type='button'
        onClick={onClick}
        data-testid='clear-button'
        className='clear'
      >
        Clear
      </button>
    );
  }
  
  export default ClearButton;