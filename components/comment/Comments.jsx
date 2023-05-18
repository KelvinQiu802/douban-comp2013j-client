'use client';

import React, { useEffect, useState } from 'react';
import style from './comments.module.css';
import Comment from './Comment';

const ORDER = {
  POPULAR: 'popular',
  LATEST: 'latest',
};

async function getComments(id) {
  if (!id) {
    return [];
  }
  const result = await fetch(
    `http://localhost:7070/api/comments/movie/${id}`
  ).then((result) => result.json());
  return result;
}

function Comments({ movie, isLogin }) {
  const [comments, setComments] = useState([]);
  const [order, setOrder] = useState(ORDER.POPULAR);

  const handlePopular = () => {
    setOrder(ORDER.POPULAR);
  };

  const handleLatest = () => {
    setOrder(ORDER.LATEST);
  };

  useEffect(() => {
    (async () => {
      setComments(await getComments(movie.movieId));
    })();
  }, [movie]);

  return (
    <div className={style.content}>
      <div className={style.order}>
        <div className={style.label}>Order: </div>
        <div
          className={order == ORDER.POPULAR ? style.select : ''}
          onClick={handlePopular}
        >
          Popular
        </div>
        <div
          className={order == ORDER.LATEST ? style.select : ''}
          onClick={handleLatest}
        >
          Latest
        </div>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} isLogin={isLogin} />
      ))}
    </div>
  );
}

export default Comments;
