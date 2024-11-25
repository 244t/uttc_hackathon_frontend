'use client';

import React from 'react';
import { Avatar, Box, Card, CardContent, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import TweetList from '../components/TweetList';  // TweetList コンポーネントをインポート
import Profile from "../components/Profile";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));


// UserDetailPage コンポーネントを修正
const UserDetailPage: React.FC = () => {
  const user_id = "002";  // 表示したいユーザーのIDを指定

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Profile user_id={user_id} />
      <h2 className="text-2xl font-bold">最近のツイート</h2>
      <TweetList mode="user" user_id={user_id} />
    </div>
  )
}

export default UserDetailPage;

