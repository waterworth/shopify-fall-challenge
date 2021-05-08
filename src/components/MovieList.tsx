import {Box} from '@chakra-ui/layout';
import {Code} from '@chakra-ui/react';
import React from 'react';
import {useQueryClient} from 'react-query';
import useMovies from '../hooks/getMovies';

interface MovieListProps {
  searchTerm: string;
}

export const MovieList: React.FC<MovieListProps> = ({searchTerm}) => {
  const queryClient = useQueryClient();
  const {status, data, error, isFetching} = useMovies(searchTerm);
  console.log(data);
  return (
    <Box w='100vw'>
      <Code>{JSON.stringify(data)}</Code>
    </Box>
  );
};
