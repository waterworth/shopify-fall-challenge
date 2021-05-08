import {Box} from '@chakra-ui/layout';
import {Code} from '@chakra-ui/react';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import useMovies from '../hooks/getMovies';

interface MovieListProps {
  searchTerm: string;
}

interface MovieDetailsProps {
  title: string;
  year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export const MovieList: React.FC<MovieListProps> = ({searchTerm}) => {
  const queryClient = useQueryClient();
  const [movieList, setMovieList] = useState<null | MovieDetailsProps[]>(null);

  const {data} = useMovies(searchTerm);

  useEffect(() => {
    if (data !== undefined && data.Response !== 'False') {
      setMovieList(data.Search);
    }
  });

  return (
    <Box w='100vw'>
      {movieList
        ? movieList.map((movie) => <Code>{JSON.stringify(movie)}</Code>)
        : null}
    </Box>
  );
};
