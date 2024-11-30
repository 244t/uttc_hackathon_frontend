'use client';

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Grid, Divider,useMediaQuery, useTheme } from '@mui/material';
import TweetList from '../components/TweetList';
import Profile from "../components/Profile";
import TweetDetail from "../components/TweetDetail";
import Sidebar from '../components/Siadebar';

const UserDetailPage: React.FC = () => {
  const params = useParams();
  const user_id = params.user_id as string;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedTweet, setSelectedTweet] = useState<string | null>(null);

  if (!user_id) {
    return (
      <Box sx={{ 
        display: 'flex', 
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Sidebar />
        <Box sx={{ 
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography>ユーザーが見つかりません。</Typography>
        </Box>
      </Box>
    );
  }

  const handleTweetClick = (tweetId: string) => {
    setSelectedTweet(tweetId);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Sidebar />
      <Box sx={{ 
        flexGrow: 1,
        overflow: 'hidden'
      }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12} md={6} sx={{ height: '100%', borderRight: 1, borderColor: 'divider' }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}>
              <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.default' }}>
                {/* <Box sx={{ p: 2 }}> */}
                <Box >
                  <Profile user_id={user_id} />
                </Box>
                <Divider />
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto' }}>
                <TweetList mode="user" user_id={user_id}/>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ 
            height: '100%', 
            display: { xs: isMobile && !selectedTweet ? 'none' : 'block' },
            overflow: 'auto'
          }}>
            <Box sx={{ 
              height: '100%',
            }}>
              <TweetDetail/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDetailPage;

