import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import useMovieById from '../hooks/getMovieByID';
import {getCardBgColor} from '../utils/getCardBgColor';
import {getScoreBadgeColor} from '../utils/getScoreBadge';
import {MovieDetailsProps} from './MovieList';

interface MovieCardProps {
  id: string;
  handleNominate?: (movie: MovieDetailsProps) => void;
  handleRemove?: (imdbID: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  id,
  handleNominate,
  handleRemove,
}) => {
  const {data} = useMovieById(id);

  return (
    <Flex
      m='8'
      w={{base: '100%', md: '70%'}}
      color='gray.800'
      borderRadius='2xl'
      bgColor={data ? getCardBgColor(data.Genre) : 'white'}
      p='12'
      alignItems='center'
      boxShadow='lg'>
      {!data ? (
        <Text>Loading...</Text>
      ) : (
        <Flex direction={{base: 'column', lg: 'row'}} w='100%'>
          {data.Poster !== 'N/A' && (
            <Box margin={{base: '0 auto', lg: '0'}} mb={{base: '8', lg: '0'}}>
              <Image minW={{lg: '300px'}} src={data.Poster}></Image>
            </Box>
          )}
          <Flex direction='column' justifyContent='space-between'>
            <Flex
              direction={{base: 'column', lg: 'row'}}
              w='100%'
              pl={{lg: '8'}}
              alignItems='center'
              justifyContent='space-between'>
              <Heading
                fontSize={{base: '2xl', sm: '3xl', lg: '4xl'}}
                textAlign='left'
                letterSpacing='wide'>
                {data ? data.Title : null}
              </Heading>
              <Badge
                bgColor={data ? getScoreBadgeColor(data.Metascore) : 'white'}
                color='gray.200'
                mt={{base: '4', lg: '0'}}
                py='2'
                px='2'
                fontSize={{lg: 'lg'}}
                borderRadius='lg'>
                <Text fontSize='xx-small'>Metascore</Text>
                {data ? data.Metascore : null}
              </Badge>
            </Flex>
            <Flex
              direction={{base: 'column', lg: 'row'}}
              mt={{base: '4', lg: '2'}}
              ml={{lg: '8'}}
              alignItems='center'>
              <Text
                fontWeight='bold'
                fontSize='md'
                pr={{base: '0', lg: '4'}}
                borderRight={{base: 'none', lg: '1px solid'}}>
                {data ? data.Year : null}
              </Text>
              <Text
                fontWeight='bold'
                fontSize='md'
                px={{base: '0', lg: '4'}}
                borderRight={{base: 'none', lg: '1px solid'}}>
                {data ? data.Rated : null}
              </Text>
              <Text
                fontWeight='bold'
                fontSize='md'
                px={{base: '0', lg: '4'}}
                borderRight={{base: 'none', lg: '1px solid'}}>
                {data ? data.Runtime : null}
              </Text>
              <Text ml='4' fontStyle='italic' fontSize='md'>
                {data ? data.Genre : null}
              </Text>
            </Flex>
            <Flex direction='column' mt='4' ml={{lg: '8'}}>
              <Text textAlign='left' fontSize='sm'>
                {data ? 'Directed By: ' + data.Director : null}
              </Text>
              <Text textAlign='left' fontSize='sm'>
                {data ? 'Starring: ' + data.Actors : null}
              </Text>
            </Flex>
            <Divider
              w={{lg: '30%'}}
              mx={{base: 0, lg: '8'}}
              my={{base: '4', lg: '8'}}
              borderColor='gray.800'
            />

            <Flex mt={{base: '0', lg: '8'}} ml={{lg: '8'}}>
              <Text
                fontSize={{base: 'sm', md: 'sm', xl: 'lg'}}
                textAlign='left'>
                {data ? data.Plot : null}
              </Text>
            </Flex>
            <Flex mx='8' mt='8' mb='0'>
              {handleNominate && (
                <Button
                  margin={{base: '0 auto', lg: '0'}}
                  w={{base: '70%', lg: '30%'}}
                  colorScheme='blackAlpha'
                  p='6'
                  onClick={() => handleNominate(data)}>
                  Nominate
                </Button>
              )}
              {handleRemove && (
                <Button
                  margin={{base: '0 auto', lg: '0'}}
                  w={{base: '70%', lg: '30%'}}
                  colorScheme='red'
                  p='6'
                  onClick={() => handleRemove(data.imdbID)}>
                  Remove
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
