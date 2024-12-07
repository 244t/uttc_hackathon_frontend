'use client'

import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { LocationOn as LocationIcon } from '@mui/icons-material'
import axios from 'axios'
import { useLoginUser } from '../contexts/LoginUserContext'; // LoginUserContextからuseLoginUserをインポート
import ProfileUpdater from './UpdateProfile' // プロフィール更新コンポーネントをインポート

interface ProfileProps {
  user_id: string
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
  })
  const [isFollowing, setIsFollowing] = useState(false) // フォロー状態を管理
  const [openEditDialog, setOpenEditDialog] = useState(false); // 編集ダイアログの状態
  const { loginUser } = useLoginUser(); // グローバルコンテキストからログインユーザーIDを取得

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // ユーザーのプロフィールを取得
  const fetchUserProfile = async (user_id: string) => {
    try {
      const response = await axios.get(
        `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}`
      )
      setUser({
        user_profile_img: response.data.img_url || '',
        header: response.data.header_url || '',
        name: response.data.name || 'Unknown User',
        bio: response.data.bio || 'No bio available',
        location: response.data.location || '',
        following: response.data.following_count || 0,
        followers: response.data.followers_count || 0,
      })
      await checkFollowingAndFollowersCount(user_id);
    } catch (err) {
      console.error(`Failed to fetch profile for user ${user_id}`, err)
      setUser({
        user_profile_img: '',
        header: '',
        name: 'Unknown User',
        bio: 'No bio available',
        location: '',
        following: 0,
        followers: 0,
      })
    }
  }

  const checkFollowingAndFollowersCount = async (user_id: string) => {
    try {
      // Get the list of followers
      const followersResponse = await axios.get(
        `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}/followers`
      );
      let followersCount = 0;
      let isUserFollowing = false;
      if (followersResponse.data){
        isUserFollowing = followersResponse.data.some((follower: { user_id: string }) => follower.user_id === loginUser);
        followersCount = followersResponse.data.length;
      }
      setIsFollowing(isUserFollowing);
  
      // Get the list of followings
      const followingResponse = await axios.get(
        `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}/following`
      );

      let followingCount = 0;
      if(followingResponse.data){
        followingCount = followingResponse.data.length ;
      }
      
      // Update the user state with the followers and following counts
      setUser((prevUser) => ({
        ...prevUser,
        followers: followersCount,
        following: followingCount,
      }));
    } catch (err) {
      console.error('Error fetching following or followers count:', err);
    }
  };

  useEffect(() => {
    fetchUserProfile(user_id);
  }, [user_id]);

  const handleFollow = async () => {
    try {
      // フォローまたはフォロー解除のAPIリクエストを送信
      const url = isFollowing
        ? `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/unfollow`
        : `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/follow`;
  
      const response = await axios.post(url, { 
        user_id: loginUser ,
        following_id : user_id
      }); // loginUserを送信
      if (response.data.success) {
          // フォロワー数の更新
          setUser((prevUser) => ({
            ...prevUser,
            followers: isFollowing ? prevUser.followers - 1 : prevUser.followers + 1,
          }));
        } else {
          // APIリクエストが失敗した場合、ボタン状態を元に戻す
          setIsFollowing(!isFollowing);
        }
    } catch (error) {
      console.error('Error following user:', error);
      // エラーが発生した場合、ボタン状態を元に戻す
      setIsFollowing(!isFollowing);
    }
  }

  return (
    <Container sx={{ width: '100%', p: 0 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={user.header || '/placeholder.svg?height=200&width=600'}
          alt="Profile header"
          sx={{ width: '100%' }}
        />
        <CardContent sx={{ position: 'relative', pt: 7, px: isMobile ? 2 : 3 }}>
          <Avatar
            src={user.user_profile_img || '/placeholder.svg?height=120&width=120'}
            alt={user.name}
            sx={{
              width: 120,
              height: 120,
              border: '4px solid white',
              position: 'absolute',
              top: isMobile ? -60 : -80,
              left: isMobile ? 'calc(50% - 60px)' : 16,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'center' : 'flex-start',
              width: '100%',
              mb: 2,
            }}
          >
            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                {user.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {user.location}
                </Typography>
              </Box>
            </Box>
            {user_id !== loginUser && (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: isMobile ? 2 : 0,
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  px: 3,
                }}
                onClick={handleFollow} // フォローボタンをクリックした時の処理
              >
                {isFollowing ? 'フォロー中' : 'フォローする'} {/* ボタンのテキスト */}
              </Button>
            )}
            {user_id === loginUser && (
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  mt: isMobile ? 2 : 0,
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  px: 3,
                }}
                onClick={() => setOpenEditDialog(true)} // ここで編集ダイアログを開く
              >
                編集する
              </Button>
            )}
          </Box>
          <Typography variant="body1" sx={{ mt: 2, mb: 3, textAlign: isMobile ? 'center' : 'left' }}>
            {user.bio}
          </Typography>

          <Stack
            direction="row"
            spacing={4}
            sx={{
              mt: 2,
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}
          >
            <Typography>
              <strong>{user.following}</strong> フォロー
            </Typography>
            <Typography>
              <strong>{user.followers}</strong> フォロワー
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* 編集ダイアログ */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth>
        <DialogTitle>プロフィールを編集</DialogTitle>
        <DialogContent>
          <ProfileUpdater 
            userData={user} 
            onClose={() => setOpenEditDialog(false)} 
            onProfileUpdate={fetchUserProfile} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Profile
