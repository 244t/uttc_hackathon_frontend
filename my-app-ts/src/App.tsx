import React,{useState} from "react";
import { CssBaseline, AppBar, Toolbar, Typography, Container, IconButton, InputBase, alpha, Box } from '@mui/material';
import { Search as SearchIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import TweetList from './components/TweetList';
import { useTheme } from '@mui/material/styles'; // useThemeフックをインポート
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Routerをインポート
import UserDetailPage from './pages/UserDetailPage';
import { LoginUserProvider } from './contexts/LoginUserContext';  // Contextをインポート
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfileRegisterPage';

export const App: React.FC = () => {
  const theme = useTheme(); // themeを取得

  return (
    <LoginUserProvider>
      <Router>  {/* Routerでアプリ全体をラップ */}
        <CssBaseline />
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <TwitterIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Tweet Display App
            </Typography>
            <Box
              sx={{
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                  marginLeft: theme.spacing(1),
                  width: 'auto',
                },
              }}
            >
              <Box
                sx={{
                  padding: theme.spacing(0, 2),
                  height: '100%',
                  position: 'absolute',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{
                  color: 'inherit',
                  '& .MuiInputBase-input': {
                    padding: theme.spacing(1, 1, 1, 0),
                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                    transition: theme.transitions.create('width'),
                    width: '100%',
                    [theme.breakpoints.up('sm')]: {
                      width: '12ch',
                      '&:focus': {
                        width: '20ch',
                      },
                    },
                  },
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Routes>  {/* ルート定義 */}
            <Route path="/" element={<TweetList mode="timeline"/>} />  {/* ツイートリスト */}
            <Route path="/user" element={<UserDetailPage />} />  {/* ユーザー詳細ページ */}
            <Route path="/signup" element={<SignUpPage />} />  {/* ユーザー詳細ページ */}
            <Route path="/profile" element={<ProfilePage />} />  {/* プロフィール設定ページ */}
          </Routes>
        </Container>
      </Router>
    </LoginUserProvider>
  );
};
