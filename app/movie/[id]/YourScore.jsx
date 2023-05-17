'use client';

import React, { useEffect, useState } from 'react';
import style from './yourscore.module.css';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';

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

function YourScore({ movie }) {
  const [isLogin, setIsLogin] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const handleChange = (e, value) => {
    if (!isLogin) {
      router.push('/login');
      return;
    }
    const userName = localStorage.getItem('userName');
    if (score == 0) {
      createScoreRecord(userName, movie.movieId, value);
    } else if (value == null) {
      deleteScoreRecord(userName, movie.movieId);
      setScore(0);
    } else {
      updateScoreRecord(userName, movie.movieId, value);
    }
    setScore(value);
    location.reload();
  };

  useEffect(() => {
    (async () => {
      const userName = localStorage.getItem('userName');
      setIsLogin(userName);
      setScore(await getScoreIfExist(userName, movie.movieId));
    })();
  }, [movie]);

  return (
    <div className={style.yourscore}>
      <span>Your Score: </span>
      <Rating
        name='no-value'
        value={score}
        onChange={handleChange}
        className={style.rate}
      />
    </div>
  );
}

export default YourScore;
