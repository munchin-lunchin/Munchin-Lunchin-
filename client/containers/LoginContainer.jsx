// URL for fetch req hardcoded in!
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
// import styled from 'styled-components';
import '../../public/index.css';
import Main from '../components/Main';
import HeroImage from '../components/HeroImage'
import FormContainer from '../components/FormContainer'
import Form from '../components/Form'
import StyledForm from '../components/StyledForm'
// import Input from '../components/Input'
// import FormLabel from '../components/FormLabel'
// import Button from '../components/Button'
import Logo from '../components/Logo'
// import isAuthenticated from "./../services/authenticate";

function LoginContainer() {
  const [redirect, setRedirect] = useState(false);

  return (
    <Main>
      <FormContainer>
        <Logo>Lunchin</Logo>
        <StyledForm id="loginContainer" />
          {/* <input type='text' name='username'  className='loginInputs' required /> */}
          {/* <FormLabel htmlFor="username">Username</FormLabel>
          <Input type='text' name='username' className='loginInputs' required />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type='password' name='password' className='loginInputs' required />
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
          }}>Log In</Button> */}
          {/* {redirect && <Redirect to='/main' />} */}
        {/* </StyledForm> */}
      </FormContainer>
      <HeroImage />
    </Main>
  )
}

export default LoginContainer;
