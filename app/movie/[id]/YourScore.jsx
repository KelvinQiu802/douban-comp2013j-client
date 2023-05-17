'use client';

import React, { useEffect, useState } from 'react';
import style from './yourscore.module.css';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';

function YourScore({ movie }) {
  const [isLogin, setIsLogin] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const handleChange = (e, value) => {
    if (!isLogin) {
      router.push('/login');
      return;
    }
    setScore(value);
  };

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    setIsLogin(userName);
  }, []);

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
