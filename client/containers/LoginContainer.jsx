// URL for fetch req hardcoded in!
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
// import isAuthenticated from "./../services/authenticate";

function LoginContainer() {
  const [redirect, setRedirect] = useState(false);
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    font-family: 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  `
  const Input = styled.input`
    color: #3C3832;
    border: 1px solid #A69E91;
    box-shadow: inset 0 1px 3px 1px rgba(0,0,0,0.15);
    border-radius: 5px;
    // font-family: 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 1em;
    line-height: 1em;
    padding: 0.75em 1em;
    width: 18em;
    transition: all 0.2s ease-in-out;
    &:focus {
      outline: 0;
      box-shadow: inset 0 1px 5px 1px rgba(0,0,0,0.15),
                        0 0 0 2px #F3C276;
    }
  `
  const FormLabel = styled.label`
    color: #918D88;
  `
  return (
    <Form id="loginContainer">
      {/* <input type='text' name='username'  className='loginInputs' required /> */}
      <FormLabel htmlFor="username">Username</FormLabel>
      <Input type='text' name='username' className='loginInputs' required />
      <FormLabel htmlFor="password">Password</FormLabel>
      <Input type='password' name='password' className='loginInputs' required />
      <button type='submit' id='login' onClick={() => {
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
          } else {
            console.log('User not authenticated.')
          }
        })
          .catch(error => console.error('Error:', error));
      }}> Login! </button>
      {redirect && <Redirect to='/main' />}
    </Form>
  )
}

export default LoginContainer;
