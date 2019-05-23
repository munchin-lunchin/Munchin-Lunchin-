// URL for fetch req hardcoded in!
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../../public/index.css';
import Main from '../components/Main';
import HeroImage from '../components/HeroImage'
import FormContainer from '../components/FormContainer'
import Form from '../components/Form'
import StyledForm from '../components/StyledForm'
import Logo from '../components/Logo'
// import isAuthenticated from "./../services/authenticate";

function LoginContainer() {
  const [redirect, setRedirect] = useState(false);

  return (
    <Main>
      <FormContainer>
        <Logo>Lunchin</Logo>
        <StyledForm id="login" setRedirect={setRedirect} />
      </FormContainer>
      <HeroImage />
      {redirect && <Redirect to='/main' />}
    </Main>
  )
}

export default LoginContainer;
