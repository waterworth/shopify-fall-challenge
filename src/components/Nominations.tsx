import {Flex} from '@chakra-ui/react';
import React, {useState} from 'react';
import {MovieCard} from './MovieCard';

import {MovieDetailsProps} from './MovieList';

interface NominationsProps {
  nominations: MovieDetailsProps[] | null;
  handleRemove: (imdbID: string) => void;
}

export const Nominations: React.FC<NominationsProps> = ({
  nominations,
  handleRemove,
}) => {
  return (
    <Flex w='100%' direction='column' alignItems='center'>
      {nominations
        ? nominations.map((movie: MovieDetailsProps) => (
            <MovieCard id={movie.imdbID} handleRemove={handleRemove} />
          ))
        : 'null'}
    </Flex>
  );
};
