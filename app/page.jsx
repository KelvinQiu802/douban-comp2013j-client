'use client';

import { Pagination, stepButtonClasses } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import MovieCard from './MovieCard';

const LIMIT = 10;

async function getPageCount() {
  const result = await fetch('http://localhost:7070/api/movies/count');
  const json = await result.json();
  const count = json.count;
  return Math.ceil(count / LIMIT);
}

async function getMovies(page, limit) {
  const result = await fetch(
    `http://localhost:7070/api/movies?page=${page}&limit=${limit}`
  );
  const json = await result.json();
  return json;
}

export default function Home() {
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  function handlePageChange(e, pageNum) {
    setPage(pageNum);
    let anchorElement = document.getElementById('head');
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    (async () => {
      setPageCount(await getPageCount());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setMovies(await getMovies(page, LIMIT));
    })();
  }, [page]);

  return (
    <main className={styles.main}>
      {movies.map((movie) => (
        <MovieCard key={movie.movieId} movie={movie} />
      ))}
      <Pagination
        count={pageCount}
        shape='rounded'
        className={styles.pagination}
        page={page}
        onChange={handlePageChange}
      />
    </main>
  );
}
