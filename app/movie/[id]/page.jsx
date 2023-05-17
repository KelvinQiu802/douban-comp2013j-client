'use client';

import React, { useEffect, useState } from 'react';
import MovieInfo from './MovieInfo';
import style from './page.module.css';
import YourScore from './YourScore';
import BookmarksBtn from '@/app/BookmarksBtn';

async function getBookmarks(userName) {
  const result = await fetch(
    `http://localhost:7070/api/bookmarks/${userName}`
  ).then((result) => result.json());
  return result;
}

export default function Page({ params }) {
  const [movie, setMovie] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    (async () => {
      const userName = localStorage.getItem('userName');
      if (userName) {
        setBookmarks(await getBookmarks(userName));
      }
      setIsLogin(userName);
    })();
  }, []);

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
      <div className={style.rate}>
        <div className={style.btns}>
          <BookmarksBtn
            isLogin={isLogin}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            movie={movie}
          />
        </div>
        <YourScore movie={movie} />
      </div>
      <div className={style.introtitle}>Introduction · · · · · ·</div>
      <div className={style.intro}>{movie.intro}</div>
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
