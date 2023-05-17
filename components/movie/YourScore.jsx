'use client';

import React, { useEffect, useState } from 'react';
import style from './yourscore.module.css';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import { getMovieScore } from '@/utils/movieUtil';

async function createScoreRecord(userName, movieId, score) {
  await fetch(
    `http://localhost:7070/api/scores/${userName}/${movieId}/${score}`,
    {
      method: 'POST',
    }
  );
}

async function updateScoreRecord(userName, movieId, score) {
  await fetch(
    `http://localhost:7070/api/scores/${userName}/${movieId}/${score}`,
    {
      method: 'PUT',
    }
  );
}

async function deleteScoreRecord(userName, movieId) {
  await fetch(`http://localhost:7070/api/scores/${userName}/${movieId}`, {
    method: 'DELETE',
  });
}

async function getScoreIfExist(userName, movieId) {
  if (!movieId) {
    return 0;
  }
  const scores = await fetch(
    `http://localhost:7070/api/scores/${movieId}`
  ).then((result) => result.json());
  for (let i = 0; i < scores.length; i++) {
    if (scores[i].userName == userName) {
      return scores[i].score;
    }
  }
  return 0;
}

function YourScore({ movie, setScore }) {
  const [isLogin, setIsLogin] = useState(false);
  const [myScore, setMyScore] = useState(0);
  const router = useRouter();

  const handleChange = async (e, value) => {
    if (!isLogin) {
      router.push('/login');
      return;
    }
    const userName = localStorage.getItem('userName');
    if (myScore == 0) {
      await createScoreRecord(userName, movie.movieId, value);
    } else if (value == null) {
      await deleteScoreRecord(userName, movie.movieId);
    } else {
      await updateScoreRecord(userName, movie.movieId, value);
    }
    setMyScore(value);
    setScore(await getMovieScore(movie.movieId));
  };

  useEffect(() => {
    (async () => {
      const userName = localStorage.getItem('userName');
      setIsLogin(userName);
      setMyScore(await getScoreIfExist(userName, movie.movieId));
    })();
  }, [movie]);

  return (
    <div className={style.yourscore}>
      <span>Your Score: </span>
      <Rating
        name='no-value'
        value={myScore}
        onChange={handleChange}
        className={style.rate}
        precision={0.5}
      />
    </div>
  );
}

export default YourScore;
