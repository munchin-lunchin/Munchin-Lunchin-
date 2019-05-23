import React, { useState } from 'react';
import Input from './Input'
import FormLabel from './FormLabel'
import Button from './Button'

const Form = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  
  const handleChange = (event) => {
    const { target } = event;
    if (target.name === 'username') setUsername(target.value);
    else if (target.name === 'password') setPassword(target.value);
    else (console.error('Unrecognized form field'));
    canSubmit();
 }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password,
      }),
    }
    console.log(JSON.stringify(payload));
    fetch('http://localhost:3000/login', payload)
    .then(res => res.json())
    .then(res => {
      console.log('Received a response from the server re: authentication:')
      if (res.authenticated) {
        console.log('The server authenticated the user!');
        props.setRedirect(res.authenticated);
      } else {
          console.log('User not authenticated.')
      }
    })
    .catch(error => console.error('Error:', error));
 }

 const canSubmit = () => {
   let fields = document.querySelectorAll('input');
   fields = [...fields];
   setDisabled(!fields.every(field => field.value));
 }

 return (
   <form className={props.className} onSubmit={handleSubmit}>
    <FormLabel htmlFor="username">Username</FormLabel>
    <Input type='text' name='username' className='loginInputs' onChange={handleChange} onBlur={handleChange} required autoComplete="off"/>
    <FormLabel htmlFor="password">Password</FormLabel>
    <Input type='password' name='password' className='loginInputs' onChange={handleChange} onBlur={handleChange} required />
    <Button type='submit' id='login' disabled={disabled}>Log In</Button>
  </form>
 );
}

export default Form;