import {
  Box,
  ChakraProvider,
  Grid,
  theme,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ColorModeSwitcher} from './ColorModeSwitcher';
import {MovieList} from './components/MovieList';
import {Nominations} from './components/Nominations';
import {Search} from './components/Search';

interface AppProps {}

const queryClient = new QueryClient();

export const App: React.FC<AppProps> = () => {
  const [input, setInput] = useState('hire me');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event?.target.value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box textAlign='center' fontSize='xl'>
          <Grid minH='100vh' p={3}>
            <ColorModeSwitcher justifySelf='flex-end' />
            <Box>
              <Search onChange={handleChange} />
            </Box>
            <Tabs py='8'>
              <TabList w='70%' margin='0 auto'>
                <Tab w='50%'>Search Results</Tab>
                <Tab w='50%'>Nomination List</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <MovieList searchTerm={input} />
                </TabPanel>
                <TabPanel>
                  <Nominations />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Grid>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
