export async function getMovieScore(id) {
  const scores = await fetch(`http://localhost:7070/api/scores/${id}`).then(
    (result) => result.json()
  );
  const scoreSum = scores.reduce((accum, score) => accum + score.score, 0);
  if (scores.length) {
    return ((scoreSum / scores.length) * 2).toFixed(1);
  }
  let score = 0;
  return score.toFixed(1);
}
