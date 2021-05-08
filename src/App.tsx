import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import {ColorModeSwitcher} from './ColorModeSwitcher';
import {QueryClient} from 'react-query';

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <ColorModeSwitcher justifySelf='flex-end' />
      </Grid>
    </Box>
  </ChakraProvider>
);
