'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Typography, Stack } from '@mui/material';
import {LocationOn as LocationIcon  } from '@mui/icons-material';
import axios from 'axios';

interface ProfileProps {
  user_id: string;
}

const Profile: React.FC<ProfileProps> = ({ user_id }) => {
  const [user, setUser] = useState({
    user_profile_img: '',
    header: '',
    name: '',
    bio: '',
    location: '',
    following: 0,
    followers: 0,
  });

  // ユーザーのプロフィール情報（名前と画像URL）を取得する関数
  const fetchUserProfile = async (user_id: string) => {
    try {
      const response = await axios.get(
        `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}`
      );
      setUser({
        user_profile_img: response.data.img_url || '',
        header : response.data.header_url || '',
        name: response.data.name || 'Unknown User',
        bio: response.data.bio || 'No bio available',
        location: response.data.location || '',
        following: response.data.following_count || 0,
        followers: response.data.followers_count || 0,
      });
    } catch (err) {
      console.error(`Failed to fetch profile for user ${user_id}`, err);
      setUser({
        user_profile_img: '',
        header : '',
        name: 'Unknown User',
        bio: 'No bio available',
        location : '',
        following: 0,
        followers: 0,
      });
    }
  };

  useEffect(() => {
    fetchUserProfile(user_id);
  }, [user_id]);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={user.header || "/placeholder.svg?height=200&width=600"}
          alt="Profile header"
        />
        <CardContent sx={{ position: 'relative' }}>
          <Avatar
            src={user.user_profile_img || '/placeholder.svg?height=120&width=120'}
            alt={user.name}
            sx={{
              width: 120,
              height: 120,
              border: '4px solid white',
              position: 'absolute',
              top: -60,
              left: 16,
            }}
          />
          <Box sx={{ ml: '140px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h5" component="h1" fontWeight="bold">
                {user.name}
              </Typography>
              {/* <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography color="text.secondary">{user.location}</Typography> */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">{user.location}</Typography>
                </Box>
            </Box>
            <Button variant="contained" color="primary">
              フォローする
            </Button>
          </Box>

          <Typography sx={{ mt: 2 }}>{user.bio}</Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Typography>
              <strong>{user.following}</strong>{' '}
              <Typography component="span" color="text.secondary">
                フォロー中
              </Typography>
            </Typography>
            <Typography>
              <strong>{user.followers}</strong>{' '}
              <Typography component="span" color="text.secondary">
                フォロワー
              </Typography>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
