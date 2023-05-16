import React from 'react';

export default function Page({ params }) {
  return <div>{params.id}</div>;
}

export async function generateStaticParams() {
  const ids = await getAllIds();

  return ids.map((id) => ({
    id: toString(id),
  }));
}

async function getAllIds() {
  const movieNumber = await fetch(
    'http://localhost:7070/api/movies/count'
  ).then((result) => result.json());
  const allMovies = await fetch(
    `http://localhost:7070/api/movies?page=1&limit=${movieNumber.count}`
  ).then((result) => result.json());
  const ids = [];
  allMovies.forEach((movie) => {
    ids.push(movie.movieId);
  });
  return ids;
}
