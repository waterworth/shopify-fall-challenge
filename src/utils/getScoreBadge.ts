export const getScoreBadgeColor = (score: string) => {
  if (score === 'N/A') {
    return 'white';
  } else {
    const scoreAsNum = parseInt(score);
    if (scoreAsNum >= 75) {
      return 'green.500';
    } else if (scoreAsNum >= 60) {
      return 'yellow.500';
    } else if (scoreAsNum >= 40) {
      return 'orange.500';
    } else return 'red.500';
  }
};
