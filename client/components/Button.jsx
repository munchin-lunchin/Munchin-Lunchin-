import styled from 'styled-components';

const Button = styled.button`
    background: ${props => (!props.disabled
    ? 'linear-gradient(176deg, #D8CBA5 0%, #8C7A4F 100%)'
    : '#F1ECE6')
};
    border: none;
    border-radius: 5px;
    color: ${props => (!props.disabled
    ? '#F7F3EE'
    : '#A69E91')};
    font-family: 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 1em;
    font-weight: 600;
    padding: 1em;
    margin: 2em 0;
    width: 18em;
    box-shadow: 0 10px 20px -10px rgba(44,42,33,0.38);
    transition: all 0.2s ease-in-out;

    &:hover {
      
      cursor: ${props => (!props.disabled
    ? 'pointer'
    : 'not-allowed')};
      box-shadow: ${props => (!props.disabled
    ? 'box-shadow: 0 15px 25px -8px rgba(44,42,33,0.45)'
    : 'not-allowed')};
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
  `;

export default Button;
