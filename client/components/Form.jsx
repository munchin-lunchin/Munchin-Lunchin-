import React, { useState } from 'react';
import Input from './Input'
import FormLabel from './FormLabel'
import Button from './Button'

const Form = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (event) => {
    const { target } = event;
    if (target.name === 'username') setUsername(target.value);
    else if (target.name === 'password') setPassword(target.value);
    else (console.error('Unrecognized form field'));
 }
 return (
   <form className={props.className}>
    <FormLabel htmlFor="username">Username</FormLabel>
    <Input type='text' name='username' className='loginInputs' onChange={handleChange} onBlur={handleChange} required autoComplete="off"/>
    <FormLabel htmlFor="password">Password</FormLabel>
    <Input type='password' name='password' className='loginInputs' onChange={handleChange} onBlur={handleChange} required />
    <Button type='submit' id='login' onClick={() => {
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
      .then(resp => resp.json())
      .then(res2 => {
        console.log('We have received a response from the server about authentication:')
        if (res2.authenticated) {
          console.log('The server authenticated the user!');
          setRedirect(res2.authenticated);
        } else {
          console.log('User not authenticated.')
        }
      })
      .catch(error => console.error('Error:', error));
      }}>Log In</Button>
  </form>
 );
}

export default Form;