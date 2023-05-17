'use client';

import React from 'react';
import styles from './movie.module.css';
import Image from 'next/image';
import { Rating } from '@mui/material';
import Link from 'next/link';

const STATUS = {
  WATCHED: 'WATCHED',
  WANNA: 'WANNA',
};

function includeMovie(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].movieId == id) {
      return true;
    }
  }
  return false;
}

function MovieCard({ movie, isLogin, bookmarks }) {
  const fakeScore = Math.random() * 10;

  const watched = bookmarks.filter((mark) => mark.status == STATUS.WATCHED);
  const wanna = bookmarks.filter((mark) => mark.status == STATUS.WANNA);

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
              className={
                includeMovie(wanna, movie.movieId) ? styles.active : ''
              }
            >
              Wanna Watch
            </div>
            <div
              className={
                includeMovie(watched, movie.movieId) ? styles.active : ''
              }
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
