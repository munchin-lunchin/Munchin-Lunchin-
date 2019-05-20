// URL for fetch req hardcoded in!
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
// import isAuthenticated from "./../services/authenticate";

function LoginContainer() {
  const [redirect, setRedirect] = useState(false);

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
        }).then(resp => resp.json()
        ).then(res2 => {
          console.log('We have received a response from the server about authentication:')
          if (res2.authenticated) {
            console.log('The server authenticated the user!');
            setRedirect(res2.authenticated);
            // return <Redirect to="/main" />
          } else {
            console.log('User not authenticated.')
          }
        })
          .catch(error => console.error('Error:', error));
      }}> Login! </button>
      {redirect && <Redirect to='/main' />}
    </div>
  )
}

export default LoginContainer;
