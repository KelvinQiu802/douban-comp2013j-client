import React, { useState } from 'react';
import style from './textarea.module.css';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { isBlank } from '@/utils/stringUtil';

function TextArea({ movie, isLogin }) {
  const router = useRouter();
  const [text, setText] = useState('');

  const handleSubmit = () => {};

  return (
    <div style={style.content}>
      {isLogin ? (
        <>
          <textarea
            placeholder='Write your comment here...'
            className={style.text}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <Button
            variant='outlined'
            color='success'
            disabled={isBlank(text)}
            className={style.submit}
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </>
      ) : (
        <Button
          variant='outlined'
          color='success'
          onClick={() => router.push('/login')}
          size='small'
        >
          Login to Comment
        </Button>
      )}
    </div>
  );
}

export default TextArea;
