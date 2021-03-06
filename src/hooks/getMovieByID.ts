import {useQuery} from 'react-query';
import axios from 'axios';

const API_KEY = 'https://www.omdbapi.com/?apikey=509bc2e';

const getMovieByID = async (id: string) => {
  const {data} = await axios.get(`${API_KEY}&i=` + id);
  return data;
};

export default function useMovieById(id: string) {
  return useQuery(['movies', id], () => getMovieByID(id));
}
