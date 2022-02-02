import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import DegreeSeperation from './problem';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DegreeSeperation/>
    </ChakraProvider>
  );
}

export default App;
