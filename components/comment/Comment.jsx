'use client';

import React, { useEffect, useState } from 'react';
import style from './comment.module.css';
import ChangeHistoryTwoToneIcon from '@mui/icons-material/ChangeHistoryTwoTone';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';

function hasMyVote(votes, name) {
  for (let i = 0; i < votes.length; i++) {
    if (votes[i].userName == name) {
      return true;
    }
  }
  return false;
}

async function getVotes(id) {
  const result = await fetch(
    `http://localhost:7070/api/commentvotes/${id}`
  ).then((result) => result.json());
  return result;
}

function Comment({ comment }) {
  const [votes, setVotes] = useState([]);
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [voteForUp, setVoteForUp] = useState(false);
  const [voteForDown, setVoteForDown] = useState(false);

  useEffect(() => {
    (async () => {
      setVotes(await getVotes(comment.commentId));
    })();
  }, [comment]);

  useEffect(() => {
    setUpCount(votes.filter((vote) => vote.status == 'UP').length);
    setDownCount(votes.filter((vote) => vote.status == 'DOWN').length);
    setVoteForUp(
      hasMyVote(
        votes.filter((vote) => vote.status == 'UP'),
        comment.userName
      )
    );
    setVoteForDown(
      hasMyVote(
        votes.filter((vote) => vote.status == 'DOWN'),
        comment.userName
      )
    );
  }, [votes, comment]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:7070/api/comments/${id}`, {
      method: 'DELETE',
    });
    location.reload();
  };

  const handleUp = async () => {
    if (!voteForUp && !voteForDown) {
      // create
      await fetch(
        `http://localhost:7070/api/commentvotes/${comment.userName}/${comment.commentId}/UP`,
        { method: 'POST' }
      );
    } else if (!voteForUp && voteForDown) {
      // update
      await fetch(
        `http://localhost:7070/api/commentvotes/${comment.userName}/${comment.commentId}/UP`,
        { method: 'PUT' }
      );
    } else if (voteForUp && !voteForDown) {
      // delete
      await fetch(
        `http://localhost:7070/api/commentvotes/${comment.commentId}`,
        { method: 'DELETE' }
      );
    }
    setVotes(await getVotes(comment.commentId));
  };

  const handleDown = async () => {
    if (!voteForUp && !voteForDown) {
      // create
      await fetch(
        `http://localhost:7070/api/commentvotes/${comment.userName}/${comment.commentId}/DOWN`,
        { method: 'POST' }
      );
    } else if (voteForUp && !voteForDown) {
      // update
      await fetch(
        `http://localhost:7070/api/commentvotes/${comment.userName}/${comment.commentId}/DOWN`,
        { method: 'PUT' }
      );
    } else if (!voteForUp && voteForDown) {
      // delete
      await fetch(
        `http://localhost:7070/api/commentvotes/${comment.commentId}`,
        { method: 'DELETE' }
      );
    }
    setVotes(await getVotes(comment.commentId));
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
      <div className={style.vote}>
        <div className={style.updiv} onClick={handleUp}>
          {voteForUp ? (
            <ChangeHistoryTwoToneIcon className={style.up} fontSize='small' />
          ) : (
            <ChangeHistoryIcon className={style.up} fontSize='small' />
          )}
          <div>{upCount}</div>
        </div>
        <div className={style.downdiv} onClick={handleDown}>
          {voteForDown ? (
            <ChangeHistoryTwoToneIcon className={style.down} fontSize='small' />
          ) : (
            <ChangeHistoryIcon className={style.down} fontSize='small' />
          )}
          <div>{downCount}</div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
