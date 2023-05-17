import React from 'react';
import style from './movieinfo.module.css';
import Image from 'next/image';
import { Rating } from '@mui/material';
import { getMovieScore } from '@/utils/movieUtil';

function MovieInfo({ movie }) {
  const [score, setScore] = React.useState('0.0');

  React.useEffect(() => {
    (async () => {
      setScore(await getMovieScore(movie.movieId));
    })();
  }, [movie]);

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
          <div className={style.info}>
            <span className={style.key}>ID: </span>
            <span className={style.value}>{movie.movieId}</span>
          </div>
        </div>
        <div className={style.left}>
          <h5>Score</h5>
          <div className={style.score}>
            <div>{score}</div>
            <Rating
              value={Math.floor(score / 2)}
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
