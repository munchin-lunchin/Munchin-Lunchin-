import React, { useState } from 'react';
import Input from './Input'
import FormLabel from './FormLabel'
import Button from './Button'

const Form = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  // set a state for invalidCredentials
  const [invalidCredentials, setCredentials] = useState(false);

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
        if (res.authenticated) {
          props.setRedirect(res.authenticated);
        } else {
          invalidUser();
        }
      })
      .catch(error => console.error('Error:', error));
  }

  const canSubmit = () => {
    let fields = document.querySelectorAll('input');
    fields = [...fields];
    setDisabled(!fields.every(field => field.value));
  }

  const invalidUser = () => {
    setCredentials(true);
  }

  return (
    <form className={props.className} onSubmit={handleSubmit}>
      <FormLabel htmlFor="username">Username</FormLabel>
      <Input type='text' name='username' className='loginInputs' onChange={handleChange} onBlur={handleChange} invalidCredentials={invalidCredentials} required autoComplete="off" />
      <FormLabel htmlFor="password">Password</FormLabel>
      <Input type='password' name='password' className='loginInputs' onChange={handleChange} onBlur={handleChange} invalidCredentials={invalidCredentials} required />
      <Button type='submit' id='login' disabled={disabled} >Log In</Button>
    </form>
  );
}

export default Form;
