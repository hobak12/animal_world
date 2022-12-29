import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  Body{
     max-width: 1200px;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      text-align: center;
  }
  input{font-size:13px;}
  button{font-size:14px;}
`;

export default GlobalStyle;
