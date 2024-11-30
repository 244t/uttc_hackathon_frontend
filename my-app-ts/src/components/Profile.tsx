
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
} from '@mui/material'
import { LocationOn as LocationIcon } from '@mui/icons-material'
import axios from 'axios'

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

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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

  useEffect(() => {
    fetchUserProfile(user_id)
  }, [user_id])

  return (
    <Container sx={{ width: '100%', p:0 }}>
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
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: isMobile ? 2 : 0,
                fontWeight: 'bold',
                borderRadius: '20px',
                px: 3,
              }}
            >
              フォローする
            </Button>
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
    </Container>
  )
}

export default Profile

