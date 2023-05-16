import React from 'react';
import style from './movieinfo.module.css';
import Image from 'next/image';
import { Rating } from '@mui/material';

function MovieInfo({ movie }) {
  const fakeScore = Math.random() * 10;

  return (
    <div className={style.content}>
      <div className={style.head}>
        <h1 className={style.title}>{movie.movieTitle}</h1>
        <h1 className={style.date}>{movie.releaseDate}</h1>
      </div>
      <div className={style.body}>
        <Image
          src={movie.imgUrl}
          width={136}
          height={200}
          alt='Cover'
          className={style.img}
        />
        <div className={style.middle}>
          <div className={style.info}>
            <span className={style.key}>Director: </span>
            <span className={style.value}>{movie.director}</span>
          </div>
          <div className={style.info}>
            <span className={style.key}>Starring: </span>
            <span className={style.value}>{movie.starring}</span>
          </div>
          <div className={style.info}>
            <span className={style.key}>Genre: </span>
            <span className={style.value}>{movie.genre}</span>
          </div>
          <div className={style.info}>
            <span className={style.key}>Country: </span>
            <span className={style.value}>{movie.country}</span>
          </div>
          <div className={style.info}>
            <span className={style.key}>Language: </span>
            <span className={style.value}>{movie.language}</span>
          </div>
          <div className={style.info}>
            <span className={style.key}>Runtime: </span>
            <span className={style.value}>{movie.runtime}</span>
          </div>
        </div>
        <div className={style.left}>
          <h5>Score</h5>
          <div className={style.score}>
            {/* <div>{movie.score}</div> */}
            <div>{fakeScore.toFixed(1)}</div>
            <Rating
              // value={Math.floor(movie.score / 2)}
              value={Math.floor(fakeScore / 2)}
              size='medium'
              className={style.star}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;