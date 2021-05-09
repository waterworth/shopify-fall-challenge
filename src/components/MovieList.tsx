import {Box} from '@chakra-ui/layout';
import {Code, Flex} from '@chakra-ui/react';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import useMovies from '../hooks/getMovies';
import {MovieCard} from './MovieCard';

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
    <Flex w='100%' direction='column' alignItems='center'>
      {movieList
        ? movieList.map((movie) => <MovieCard id={movie.imdbID} />)
        : null}
    </Flex>
  );
};
