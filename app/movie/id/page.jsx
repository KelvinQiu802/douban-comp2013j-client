export async function generateStaticParams() {
  const result = await fetch('http:localhost:7070/api/movies');

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getAllIds() {
  const movieNumber = await fetch(
    'http://localhost:7070/api/movies/count'
  ).then((result) => result.json());
  const allMovies = await fetch(
    `http://localhost:7070/api/movies?page=1&limit=${movieNumber.count}`
  ).then((result) => result.json());
  const ids = allMovies.map((movie) => {
    return { movieId: movie.movieId };
  });
  return ids;
}
