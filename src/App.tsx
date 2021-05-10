import {
  Badge,
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  theme,
} from '@chakra-ui/react';
import React, {ChangeEvent, useState} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import logo from './assets/shopify-logo.png';
import {Helmet} from 'react-helmet';
import toast, {Toaster} from 'react-hot-toast';
import {ColorModeSwitcher} from './ColorModeSwitcher';
import {MovieDetailsProps, MovieList} from './components/MovieList';
import {Nominations} from './components/Nominations';
import {Search} from './components/Search';

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
        toast.error("You've already added that movie!");
      } else {
        setNominations([...nominations, movie]);
        toast.success(`${movie.Title} added to nominations`);
      }
    } else {
      toast.error('Nominations are full!');
    }
  };

  const handleRemoveNomination = (imdbID: string) => {
    if (nominations) {
      const removeMovie = nominations.filter(
        (movie: MovieDetailsProps) => movie.imdbID !== imdbID
      );
      setNominations(removeMovie);
      toast.error(`Removed from nominations`);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <link rel='icon' type='image/png' href={logo} />
        <title>The Shoppies</title>
      </Helmet>
      <ChakraProvider theme={theme}>
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 5000,
            success: {
              duration: 3000,
              style: {
                background: '#e3f1df',
                color: '#414f3e',
              },
            },
            error: {
              style: {
                background: '#bf0711',
                color: 'white',
              },
            },
          }}
        />
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
              <TabList w={{base: '100%', md: '70%'}} margin='0 auto'>
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
