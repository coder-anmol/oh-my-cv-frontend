import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Questions from './components/Questions';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Box>
        <Questions />
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
