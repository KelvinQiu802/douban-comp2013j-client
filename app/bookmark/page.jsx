'use client';

import React, { useEffect, useState } from 'react';
import style from './page.module.css';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsLogin(localStorage.getItem('userName'));
  }, []);

  return (
    <div className={style.content}>
      {isLogin ? (
        <div className={style.logined}>
          <h1 className={style.category}>Want to Watch: </h1>
          <h1 className={style.category}>Already Watched: </h1>
        </div>
      ) : (
        <div className={style.notlogin}>
          <h1>Please log in to check your bookmarks!</h1>
          <Button
            variant='contained'
            color='success'
            size='large'
            onClick={() => router.push('/login')}
          >
            To Login
          </Button>
        </div>
      )}
    </div>
  );
}
