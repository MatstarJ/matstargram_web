import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #fafafa;
    color: #262626;
    font-size: 14px;
    line-height: 18px;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  ul, li {
    list-style: none;
  }
  
  button, input {
    outline: none;
    border: none;
    background: none;
  }
`;

export default GlobalStyle; 