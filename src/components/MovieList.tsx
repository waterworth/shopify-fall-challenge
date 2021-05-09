import {Flex} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import useMovies from '../hooks/getMovies';
import {MovieCard} from './MovieCard';

interface MovieListProps {
  searchTerm: string;
  handleNominate: (movie: MovieDetailsProps) => void;
}

export interface MovieDetailsProps {
  Title: string;
  year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export const MovieList: React.FC<MovieListProps> = ({
  searchTerm,
  handleNominate,
}) => {
  const [movieList, setMovieList] = useState<null | MovieDetailsProps[]>(null);

  const {data} = useMovies(searchTerm);

  useEffect(() => {
    if (data !== undefined && data.Response !== 'False') {
      setMovieList(data.Search);
    }
  }, [searchTerm]);

  return (
    <Flex w='100%' direction='column' alignItems='center'>
      {movieList
        ? movieList.map((movie) => (
            <MovieCard
              key={uuid()}
              id={movie.imdbID}
              handleNominate={handleNominate}
            />
          ))
        : null}
    </Flex>
  );
};
