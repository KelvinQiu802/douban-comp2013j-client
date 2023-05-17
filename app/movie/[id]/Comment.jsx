import React from 'react';
import style from './comment.module.css';

function Comment({ comment }) {
  const handleDelete = async (id) => {
    await fetch(`http://localhost:7070/api/comments/${id}`, {
      method: 'DELETE',
    });
    location.reload();
  };

  return (
    <div className={style.comment}>
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
  );
}

export default Comment;
