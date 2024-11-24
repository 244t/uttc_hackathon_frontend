import React from "react";
import { CssBaseline, AppBar, Toolbar, Typography, Container, IconButton, InputBase, alpha, Box } from '@mui/material';
import { Search as SearchIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import TweetList from './components/TweetList';
import { useTheme } from '@mui/material/styles'; // useThemeフックをインポート

export const App: React.FC = () => {
  const theme = useTheme(); // themeを取得

  return (
    <>
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
        <TweetList />
      </Container>
    </>
  );
}