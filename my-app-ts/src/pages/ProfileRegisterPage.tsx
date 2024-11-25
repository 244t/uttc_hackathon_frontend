import { Container, Paper, Typography, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ProfileRegister from '../components/ProfileRegister';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1DA1F2', // Twitter blue
    },
  },
});

const ProfilePage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            プロフィール設定
          </Typography>
        <ProfileRegister />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;
