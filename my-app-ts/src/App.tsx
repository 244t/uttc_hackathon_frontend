import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import TimelinePage from './pages/TimelinePage';
import UserDetailPage from './pages/UserDetailPage';
import SignUpPage from './pages/SignUpPage';
import ProfileRegisterPage from './pages/ProfileRegisterPage';
import { LoginUserProvider, useLoginUser } from './contexts/LoginUserContext';  // Contextをインポート
import { TweetProvider } from './contexts/TweetContext'; // TweetContextのインポート
import { AvatarProvider } from './contexts/AvatarContext';
import darkTheme from './theme/darkTheme';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginFormPage';
import { useNavigate } from 'react-router-dom';


export const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <LoginUserProvider>
        <AvatarProvider>
        <TweetProvider>
          <Router>
            <CssBaseline />

            <Box sx={{ display: 'flex', bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path='/search' element={<SearchPage/>}/>
                    <Route path="/timeline" element={<TimelinePage />} />
                    <Route path="/user/:user_id" element={<UserDetailPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/profile" element={<ProfileRegisterPage />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          </Router>
        </TweetProvider>
        </AvatarProvider>
      </LoginUserProvider>
    </ThemeProvider>
  );
};
