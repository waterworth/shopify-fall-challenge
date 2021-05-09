export const getCardBgColor = (genre: string) => {
  const mainGenre: string[] = genre.split(',');
  switch (mainGenre[0]) {
    case 'Comedy':
      return 'yellow.300';
    case 'Drama':
    case 'Action':
    case 'Adventure':
    case 'Short':
    case 'Film-Noir':
      return 'gray.300';
    case 'Horror':
    case 'Thriller':
    case 'Mystery':
      return 'red.300';
    case 'Family':
    case 'Animation':
    case 'Sport':
      return 'green.200';

    case 'Adult':
    case 'Romance':
      return 'pink.200';

    case 'Sci-fi':
    case 'Fantasy':
      return 'purple.200';

    case 'Music':
    case 'Musical':
      return 'blue.200';

    case 'War':
    case 'Western':
    case 'History':
      return '#D0C4A0';

    case 'Documentary':
    case 'Crime':
    case 'Biography':
      return 'teal.200';
    default:
      break;
  }
};
