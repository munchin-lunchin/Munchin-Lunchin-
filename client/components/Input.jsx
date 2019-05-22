import styled from 'styled-components';

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
    margin-bottom: 1em;
    width: 18em;
    transition: all 0.2s ease-in-out;
    &:focus {
      outline: 0;
      box-shadow: inset 0 1px 5px 1px rgba(0,0,0,0.15),
                        0 0 0 2px #F3C276;
    }
  `;

export default Input;
