// URL for fetch req hardcoded in!
import React, { Component } from 'react';

function LoginContainer () {
  return (
    <div>
      <input id='username' placeholder='Username' className='loginInputs' />
      <input id='password' placeholder='Password' className='loginInputs' />
      <button id='login' onClick={() => {
        const data = {
          username: document.querySelector('#username').value,
          password: document.querySelector('#password').value
        }
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
          .catch(error => console.error('Error:', error));
      }}> Login! </button>
    </div>
  )
}

export default LoginContainer;