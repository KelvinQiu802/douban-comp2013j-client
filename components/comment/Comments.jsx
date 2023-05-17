'use client';

import React, { useEffect, useState } from 'react';
import style from './comments.module.css';
import Comment from './Comment';

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

  useEffect(() => {
    (async () => {
      setComments(await getComments(movie.movieId));
    })();
  }, [movie]);

  return (
    <div className={style.content}>
      {comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} isLogin={isLogin} />
      ))}
    </div>
  );
}

export default Comments;
