// URL for fetch req hardcoded in!
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import '../../public/index.css';
// import isAuthenticated from "./../services/authenticate";

function LoginContainer() {
  const [redirect, setRedirect] = useState(false);
  const Main = styled.main`
    display: flex;
    justify-content: space-between;
    // height: 100vh;
  `
  const FormContainer = styled.div`
    margin: 0 auto;
  `
  const HeroImage = styled.div`
    order: -1;
    width: 40vw;
    height: 100vh;
    // margin: -8px;
    margin-right: 0;
    background: url(https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80);
    background-size: cover;
  `
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
    font-family: 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
  const Button = styled.button`
    background: ${props => !props.disabled
      ? 'linear-gradient(176deg, #D8CBA5 0%, #8C7A4F 100%)'
      : '#F1ECE6'
    };
    border: none;
    border-radius: 5px;
    color: ${props => !props.disabled 
      ? '#F7F3EE'
      : '#A69E91'};
    font-family: 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 1em;
    font-weight: 600;
    padding: 1em;
    margin: 2em 0;
    width: 18em;
    box-shadow: 0 10px 20px -10px rgba(44,42,33,0.38);
    transition: all 0.2s ease-in-out;

    &:hover {
      
      cursor: ${props => !props.disabled 
        ? 'pointer'
        : 'not-allowed'};
      box-shadow: ${props => !props.disabled 
        ? 'box-shadow: 0 15px 25px -8px rgba(44,42,33,0.45)'
        : 'not-allowed'};
      transform: translateY(-1px);
    }

    &:focus {
      outline: 0;
      box-shadow: 0 15px 25px -8px rgba(44,42,33,0.45);
    }

    &:active {
      transform: translateY(0px);
      transform: scale(0.975);
      box-shadow: 0 8px 16px -8px rgba(44,42,33,0.38);
    }
  `
  return (
    <Main>
      <FormContainer>
        <Form id="loginContainer">
          {/* <input type='text' name='username'  className='loginInputs' required /> */}
          <FormLabel htmlFor="username">Username</FormLabel>
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
          }}>Log In</Button>
          {redirect && <Redirect to='/main' />}
        </Form>
      </FormContainer>
      <HeroImage />
    </Main>
  )
}

export default LoginContainer;
