import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  margin: 0;
  padding: 18px;
  border-radius: 50px;
  border: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  outline: currentcolor none medium;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  opacity: 0.95;
  background-color: lightseagreen;
  color: #ffffff;
  transition: all 0.2s ease;

  :hover {
    cursor: pointer;
    transform: scale(1.04);
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export default Button;
