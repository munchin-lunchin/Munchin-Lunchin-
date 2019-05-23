import React, { useState } from 'react';
import { Redirect } from "react-router-dom";


function LoginContainer() {
  const [redirect, setRedirect] = useState(false);
  return (
    <div id="loginContainer">
      <div><strong>Login</strong></div>
      <input
        id='username'
        placeholder='Username'
        className='loginInputs'
      />
      <input
        type='password'
        id='password'
        placeholder='Password'
        className='loginInputs'
      />
      <button id='login' onClick={() => {
        const data = {
          username: document.querySelector('#username').value,
          password: document.querySelector('#password').value
        }
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(res2 => {
          if (res2.authenticated) {
            setRedirect(res2.authenticated);
          } else {
          }
        })
        .catch(error => console.error('Error:', error)); }}>
        Login
      </button>
      {redirect && <Redirect to='/main' />}
    </div>
  )
}

export default LoginContainer;
