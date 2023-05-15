'use client';

import React from 'react';
import style from './header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Header() {
  const router = useRouter();

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

        <div className={style.right}>
          <Link href={'/login'}>Login</Link>
          <span>/</span>
          <Link href={'/signup'}>Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
