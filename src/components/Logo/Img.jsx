import styled from 'styled-components';

const Img = styled.img`
  display: block;
  width: ${props => props.width};
  height: ${props => props.height};
  margin: 0;
  padding: 0;
`;

export default Img;
