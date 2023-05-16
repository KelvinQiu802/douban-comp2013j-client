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
import { isBlank } from '@/utils/stringUtil';
import { useRouter } from 'next/navigation';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function LogIn() {
  const router = useRouter();

  let [unauthorized, setUnauthorized] = React.useState(false);
  let [btnDisabled, setBtnDisabled] = React.useState(true);
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
    const result = await fetch('http://localhost:7070/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    setUnauthorized(false);
    if (result.status == 200) {
      localStorage.setItem('userName', userInfo.userName);
      router.push('/');
    } else if (result.status == 401) {
      setUnauthorized(true);
      setBtnDisabled(true);
      setUserInfo({ userName: '', password: '' });
    } else {
      alert('Login failed, please try again.');
    }
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
            Log In
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
              value={userInfo.userName}
              autoFocus
            />
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
            {unauthorized && (
              <Alert severity='error' sx={{ width: 400 }}>
                The user name or password is incorrect.
              </Alert>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={btnDisabled}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: green[400],
                ':hover': {
                  backgroundColor: green[600],
                },
              }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href='/signup'
                  variant='body2'
                  sx={{ color: green[800], textDecorationColor: green[800] }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
