'use client';

import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

async function getPageCount() {
  const LIMIT = 15;
  const result = await fetch('http://localhost:7070/api/movies/count');
  const json = await result.json();
  const count = json.count;
  return Math.ceil(count / LIMIT);
}

export default function Home() {
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    (async () => {
      setPageCount(await getPageCount());
    })();
  }, []);

  return (
    <main className={styles.main}>
      <Pagination
        count={pageCount}
        shape='rounded'
        className={styles.pagination}
      />
    </main>
  );
}
