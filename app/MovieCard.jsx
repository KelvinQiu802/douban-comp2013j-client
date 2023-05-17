'use client';

import React from 'react';
import styles from './movie.module.css';
import Image from 'next/image';
import { Rating } from '@mui/material';
import Link from 'next/link';
import STATUS from '@/utils/bookmarkStatus';

function includeMovie(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].movieId == id) {
      return true;
    }
  }
  return false;
}

async function getBookmarks(userName) {
  const result = await fetch(
    `http://localhost:7070/api/bookmarks/${userName}`
  ).then((result) => result.json());
  return result;
}

function MovieCard({ movie, isLogin, bookmarks, setBookmarks }) {
  const fakeScore = Math.random() * 10;

  const watched = bookmarks.filter((mark) => mark.status == STATUS.WATCHED);
  const wanna = bookmarks.filter((mark) => mark.status == STATUS.WANNA);
  const isWanna = includeMovie(wanna, movie.movieId);
  const isWatched = includeMovie(watched, movie.movieId);

  const handleWannaWatch = async () => {
    const userName = localStorage.getItem('userName');
    if (!isWanna && !isWatched) {
      // create new bookmark
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}/${STATUS.WANNA}`,
        { method: 'POST' }
      );
    } else if (!isWanna && isWatched) {
      // update status
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}/${STATUS.WANNA}`,
        { method: 'PUT' }
      );
    } else if (isWanna && !isWatched) {
      // delete bookmark
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}`,
        { method: 'DELETE' }
      );
    }
    setBookmarks(await getBookmarks(userName));
  };

  const handleWatched = async () => {
    const userName = localStorage.getItem('userName');
    if (!isWanna && !isWatched) {
      // create new bookmark
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}/${STATUS.WATCHED}`,
        { method: 'POST' }
      );
    } else if (isWanna && !isWatched) {
      // update status
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}/${STATUS.WATCHED}`,
        { method: 'PUT' }
      );
    } else if (!isWanna && isWatched) {
      // delete bookmark
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}`,
        { method: 'DELETE' }
      );
    }
    setBookmarks(await getBookmarks(userName));
  };

  return (
    <div className={styles.card}>
      <Link href={`/movie/${movie.movieId}`}>
        <Image src={movie.imgUrl} alt='img' width={100} height={150} />
      </Link>
      <div className={styles.right}>
        <Link href={`/movie/${movie.movieId}`}>
          <h1>{movie.movieTitle}</h1>
        </Link>
        <p className={styles.director}>
          {`Director: ${movie.director} / Starring: ${movie.starring}`}
        </p>
        <p
          className={styles.info}
        >{`${movie.releaseDate} / ${movie.country} / ${movie.genre}`}</p>
        <div className={styles.rating}>
          <Rating
            // value={Math.floor(movie.score / 2)}
            value={Math.floor(fakeScore / 2)}
            size='small'
            readOnly
            className={styles.stars}
          />
          {/* <div className={styles.score}>{movie.score}</div> */}
          <div className={styles.score}>{fakeScore.toFixed(1)}</div>
        </div>
        <p className={styles.abstract}>{`"${movie.abstractInfo}"`}</p>
        {isLogin ? (
          <div className={styles.btns}>
            <div
              className={isWanna ? styles.active : ''}
              onClick={handleWannaWatch}
            >
              Wanna Watch
            </div>
            <div
              className={isWatched ? styles.active : ''}
              onClick={handleWatched}
            >
              Watched
            </div>
          </div>
        ) : (
          <div className={styles.btns}>
            <Link href='/login'>Wanna Watch</Link>
            <Link href='/login'>Watched</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
