import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

const SignupComponent = () => {
  const [redirect, setRedirect] = useState(false);
  const [taken, setTaken] = useState(false);
  return (
    <container className="signup">
      <h2>Sign-Up!</h2>
      <input id="signName" placeholder="Username"></input>
      <input id="signPass" placeholder="Password"></input>
      <button onClick={()=> {
        setTaken(false);
        const signData = {
          username: document.querySelector('#signName').value,
          password: document.querySelector('#signPass').value
        };

        console.log(signData)

        fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signData)
        })
          .then(res => res.json())
          .then(res => {
            console.log(res)
            if (res.authenticated) {
              setRedirect(res.authenticated);
            } else {
              setTaken(true);
            }
          })
          .catch(error => console.error('Error:', error));
      }}>Sign-up!</button>
      {taken && <div>Username Taken</div>}
      {redirect && <Redirect to='/main' />}
    </container>
  )
}

export default SignupComponent;