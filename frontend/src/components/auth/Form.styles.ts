import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const FormWrapper = styled.section<{ registerStyles ?: boolean }>`
  width: 50rem;
  height: ${({ registerStyles }) => registerStyles ? '29rem' : '20rem'};
  margin: 5rem auto;
  border: 1px solid black;
`;

export const Button = styled.button`
  width: 40%;
  display: block;
  margin: 2rem auto;
  padding: 0.5rem;
`;

export const CustomLink = styled(Link)`
  width: 46%;
  margin: 0 auto;
  display: block;
  text-align: center;
  border-bottom: 1px solid black;
`;