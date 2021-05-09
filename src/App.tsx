import {
  Box,
  Image,
  ChakraProvider,
  Grid,
  theme,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
  Flex,
  Heading,
  VStack,
} from '@chakra-ui/react';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ColorModeSwitcher} from './ColorModeSwitcher';
import {MovieDetailsProps, MovieList} from './components/MovieList';
import {Nominations} from './components/Nominations';
import {Search} from './components/Search';
import logo from './assets/shopify-logo.png';

interface AppProps {}

const queryClient = new QueryClient();

export const App: React.FC<AppProps> = () => {
  const [input, setInput] = useState('hire me');
  const [nominations, setNominations] = useState<null | MovieDetailsProps[]>(
    []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event?.target.value);
  };

  const handleNominate = (movie: MovieDetailsProps) => {
    if (nominations && nominations.length === 0) {
      setNominations([...nominations, movie]);
    }
    if (nominations && nominations.length < 5) {
      if (nominations.includes(movie)) {
        // toast.error("You've already added that movie!");
      } else {
        setNominations([...nominations, movie]);
        // toast.success(`${movie.title} added to nominations`);
      }
    } else {
      // toast.error('Nominations are full!');
    }
  };

  const handleRemoveNomination = (imdbID: string) => {
    if (nominations) {
      const removeMovie = nominations.filter(
        (movie: any) => movie.imdbID !== imdbID
      );
      setNominations(removeMovie);
      // toast.error(`Movie removed from nominations`);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box textAlign='center' fontSize='xl'>
          <Flex direction='column' minH='100vh' p={3}>
            <Flex justifyContent='flex-end'>
              <ColorModeSwitcher justifySelf='flex-end' />
            </Flex>
            <Flex margin='0 auto'>
              <Image mb='8' boxSize='75px' src={logo} mr='4' />
              <Heading mb='8' as='h1' size='2xl'>
                The Shoppies
              </Heading>
            </Flex>
            <Box>
              <Search onChange={handleChange} />
            </Box>
            <Tabs py='8'>
              <TabList w='70%' margin='0 auto'>
                <Tab w='50%'>Search Results 🔎</Tab>
                <Tab w='50%'>
                  Nomination List 🏆
                  <Badge ml='4'>{nominations && nominations.length}</Badge>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <MovieList
                    searchTerm={input}
                    handleNominate={handleNominate}
                  />
                </TabPanel>
                <TabPanel>
                  <Nominations
                    nominations={nominations}
                    handleRemove={handleRemoveNomination}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
