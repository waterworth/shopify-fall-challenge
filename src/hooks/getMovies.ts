import {useQuery} from 'react-query';
import axios from 'axios';

const API_KEY = 'http://www.omdbapi.com/?apikey=509bc2e';

const getMovies = async (searchTerm: string) => {
  const {data} = await axios.get(
    `${API_KEY}&s=` + searchTerm + '&type=movie&page=1'
  );
  return data;
};

export default function useMovies(searchTerm: string) {
  return useQuery(['movies', searchTerm], () => getMovies(searchTerm));
}
