import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Baloo Paaji 2');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Baloo Paaji 2', sans-serif;
    font-size: 1rem;;
  }

  ::-webkit-scrollbar {
      width: 10px;
  }

  ::-webkit-scrollbar-track {
      background: #f1f1f1;
  }


  ::-webkit-scrollbar-thumb {
      background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
      background: #555;
  }
`;