'use client';

import React, { useEffect, useState } from 'react';
import style from './header.module.css';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

function Header() {
  const router = useRouter();
  const path = usePathname();

  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    setIsLogin(false);
    location.reload();
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem('userName'));
  }, [path]);

  return (
    <div className={style.header} id='head'>
      <div className={style.content}>
        <div className={style.left} onClick={() => router.push('/')}>
          <Image
            src={'/favicon.svg'}
            width={35}
            height={35}
            alt='facivon'
            className={style.icon}
          />
          <h1>Douban Movies</h1>
        </div>
        {isLogin ? (
          <div className={style.rightlogined}>
            <p>{`Hi, ${localStorage.getItem('userName')}`}</p>
            <Link href='/bookmark'>Bookmarks</Link>
            <span onClick={handleLogout}>Logout</span>
          </div>
        ) : (
          <div className={style.right}>
            <Link href={'/login'}>Login</Link>
            <span>/</span>
            <Link href={'/signup'}>Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
