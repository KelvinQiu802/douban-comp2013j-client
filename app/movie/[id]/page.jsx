'use client';

import React, { useEffect, useState } from 'react';
import MovieInfo from './MovieInfo';
import style from './page.module.css';

export default function Page({ params }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      const movie = await fetch(
        `http://localhost:7070/api/movies/${params.id}`
      ).then((result) => result.json());
      setMovie(movie);
    })();
  }, [params.id]);

  return (
    <div className={style.content}>
      <MovieInfo movie={movie} />
    </div>
  );
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
