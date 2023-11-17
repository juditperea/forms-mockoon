import React from 'react';
function UsernameInput({ value, onChange, usernameAlert }) {
  return (
    <div>
      <p>Username</p>
      <p className='message-error' data-testid='message-error'>
        {usernameAlert && usernameAlert}
      </p>
      <input
        type='text'
        data-testid='username'
        value={value.toUpperCase()}
        onChange={onChange}
      />
    </div>
  );
}

export default UsernameInput;
