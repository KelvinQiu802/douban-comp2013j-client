'use client';

import React, { useEffect, useState } from 'react';
import style from './comments.module.css';

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

  const handleDelete = async (id) => {
    await fetch(`http://localhost:7070/api/comments/${id}`, {
      method: 'DELETE',
    });
    location.reload();
  };

  useEffect(() => {
    (async () => {
      setComments(await getComments(movie.movieId));
    })();
  }, [movie]);

  return (
    <div className={style.content}>
      {comments.map((comment) => (
        <div key={comment.commentId} className={style.comment}>
          <div className={style.info}>
            <div className={style.user}>{comment.userName}</div>
            <div className={style.time}>{comment.time.slice(0, -2)}</div>
            {comment.userName == localStorage.getItem('userName') && (
              <div
                className={style.delete}
                onClick={() => handleDelete(comment.commentId)}
              >
                Delete
              </div>
            )}
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
