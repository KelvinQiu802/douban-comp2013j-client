'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { isBlank } from '@/utils/stringUtil';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function SignUp() {
  const router = useRouter();

  let [btnDisabled, setBtnDisabled] = React.useState(true);
  let [hasSameName, setHasSameName] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    userName: '',
    password: '',
  });

  const handleInfoChange = (e) => {
    setUserInfo((prev) => {
      const updated = { ...prev, [e.target.name]: e.target.value };
      setBtnDisabled(isBlank(updated.userName) || isBlank(updated.password));
      return updated;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await fetch('http://localhost:7070/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    if (result.status != 200) {
      alert('Sign up failed, please try again.');
    } else {
      router.push('/');
    }
  };

  const handleNameCheck = async () => {
    const users = await fetch('http://localhost:7070/api/users');
    const userList = await users.json();
    setHasSameName(userList.includes(userInfo.userName));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: green[200] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Username'
              name='userName'
              color='success'
              onChange={handleInfoChange}
              onBlur={handleNameCheck}
              value={userInfo.userName}
              autoFocus
            />
            {hasSameName && (
              <Alert severity='error' sx={{ width: 400 }}>
                The user name has been used.
              </Alert>
            )}
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              color='success'
              onChange={handleInfoChange}
              value={userInfo.password}
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={btnDisabled || hasSameName}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: green[400],
                ':hover': {
                  backgroundColor: green[600],
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href='/login'
                  variant='body2'
                  sx={{ color: green[800], textDecorationColor: green[800] }}
                >
                  {'Already have an account? Login'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
