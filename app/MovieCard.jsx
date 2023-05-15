'use client';

import React from 'react';
import styles from './movie.module.css';
import Image from 'next/image';
import { Rating } from '@mui/material';

function MovieCard({ movie }) {
  const fakeScore = Math.random() * 10;

  return (
    <div className={styles.card}>
      <Image src={movie.imgUrl} alt='img' width={100} height={150} />
      <div className={styles.right}>
        <h1>{movie.movieTitle}</h1>
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
        <div className={styles.btns}>
          <div>Wanna Watch</div>
          <div>Watched</div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
