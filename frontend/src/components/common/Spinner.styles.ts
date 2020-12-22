import styled from 'styled-components';

export const SpinnerContainer = styled.div`
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  border: 3px solid gray;
  border-top-color: black;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
`;