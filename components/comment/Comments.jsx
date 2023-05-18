'use client';

import React, { useEffect, useState } from 'react';
import style from './comments.module.css';
import Comment from './Comment';

const ORDER = {
  POPULAR: 'popular',
  LATEST: 'latest',
};

async function getVotes(id) {
  const result = await fetch(
    `http://localhost:7070/api/commentvotes/${id}`
  ).then((result) => result.json());
  return result;
}

async function sortByPolular(comments) {
  const resultPromise = comments.map(async (comment) => {
    const votes = await getVotes(comment.commentId);
    const up = votes.filter((vote) => vote.status == 'UP').length;
    const down = votes.filter((vote) => vote.status == 'DOWN').length;
    return {
      ...comment,
      popular: up - down,
    };
  });
  const commentWitPopular = await Promise.all(resultPromise);
  commentWitPopular.sort((a, b) => b.popular - a.popular);
  return commentWitPopular;
}

function sortByTime(comments) {
  const commentsCopy = [...comments];
  commentsCopy.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
  return commentsCopy;
}

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
      setComments(await sortByPolular(await getComments(movie.movieId)));
    })();
  }, [movie]);

  useEffect(() => {
    (async () => {
      if (order == ORDER.POPULAR) {
        setComments(await sortByPolular(comments));
      } else {
        setComments(sortByTime(comments));
      }
    })();
  }, [order]);

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
