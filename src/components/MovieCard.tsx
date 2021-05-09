import {
  Flex,
  Heading,
  Button,
  Text,
  Box,
  Image,
  Badge,
  Divider,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {useQueryClient} from 'react-query';
import {getCardBgColor} from '../utils/getCardBgColor';
import useMovieById from '../hooks/getMovieByID';
import {getScoreBadgeColor} from '../utils/getScoreBadge';

interface MovieCardProps {
  id: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({id}) => {
  const queryClient = useQueryClient();
  const [movieDetails, setMovieDetails] = useState();
  const {data} = useMovieById(id);

  useEffect(() => {
    if (data !== undefined && data.Response !== 'False') {
      setMovieDetails(data.Search);
    }
  });

  console.log(data);

  return (
    <Flex
      m='8'
      w='70%'
      color='gray.800'
      borderRadius='2xl'
      bgColor={data ? getCardBgColor(data.Genre) : 'white'}
      p='12'
      alignItems='center'
      boxShadow='lg'>
      {!data ? (
        <Text>Loading...</Text>
      ) : (
        <Flex direction='row'>
          <Box>
            <Image minW='300px' src={data.Poster}></Image>
          </Box>
          <Flex direction='column' maxH='460px' justifyContent='space-between'>
            <Flex ml='8' alignItems='center' justifyContent='space-between'>
              <Heading textAlign='left' letterSpacing='wide'>
                {data ? data.Title : null}
              </Heading>
              <Badge
                bgColor={data ? getScoreBadgeColor(data.Metascore) : 'white'}
                color='gray.200'
                py='2'
                px='2'
                fontSize='lg'
                borderRadius='lg'>
                <Text fontSize='xx-small'>Metascore</Text>
                {data ? data.Metascore : null}
              </Badge>
            </Flex>
            <Flex mt='2' ml='8' alignItems='center'>
              <Text
                fontWeight='bold'
                fontSize='md'
                pr='4'
                borderRight='1px solid'>
                {data ? data.Year : null}
              </Text>
              <Text
                fontWeight='bold'
                fontSize='md'
                px='4'
                borderRight='1px solid'>
                {data ? data.Rated : null}
              </Text>
              <Text
                fontWeight='bold'
                fontSize='md'
                px='4'
                borderRight='1px solid'>
                {data ? data.Runtime : null}
              </Text>
              <Text ml='4' fontStyle='italic' fontSize='md'>
                {data ? data.Genre : null}
              </Text>
            </Flex>
            <Flex direction='column' mt='4' ml='8'>
              <Text textAlign='left' fontSize='sm'>
                {data ? 'Directed By: ' + data.Director : null}
              </Text>
              <Text textAlign='left' fontSize='sm'>
                {data ? 'Starring: ' + data.Actors : null}
              </Text>
            </Flex>
            <Divider w='30%' m='8' borderColor='gray.800' />

            <Flex mt='8' ml='8'>
              <Text textAlign='left'>{data ? data.Plot : null}</Text>
            </Flex>
            <Flex mx='8' mt='8' mb='0'>
              <Button w='30%' colorScheme='blackAlpha' p='6'>
                Nominate
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
