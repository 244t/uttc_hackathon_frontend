import React, { useState } from 'react'
import { TextField, Button, Stack, Avatar, Box } from '@mui/material'
import axios from 'axios'
import { storage } from '../firebase'; // Firebase storage import
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase storage methods
import { useLoginUser } from '../contexts/LoginUserContext'; // LoginUserContextからuseLoginUserをインポート
import { AvatarProvider, useAvatar } from '../contexts/AvatarContext';
interface ProfileRegisterProps {
  userData: any;
  onClose: () => void;
  onProfileUpdate: (user_id: string) => void;
}

const ProfileUpdater: React.FC<ProfileRegisterProps> = ({ userData, onClose, onProfileUpdate }) => {
  const [name, setName] = useState(userData.name)
  const [bio, setBio] = useState(userData.bio)
  const [location, setLocation] = useState(userData.location)
  const { loginUser } = useLoginUser();
  const {loginName,setAvatarUrl,setLoginName} = useAvatar();

  // New state variables for image files
  const [userProfileImg, setUserProfileImg] = useState<File | null>(null)
  const [headerImg, setHeaderImg] = useState<File | null>(null)

  // Upload image to Firebase Storage
  const uploadImage = async (image: File, path: string) => {
    if (!image) return null;
    const imageRef = ref(storage, path);  // Create a reference for the image
    await uploadBytes(imageRef, image);  // Upload image to Firebase
    const imageUrl = await getDownloadURL(imageRef);  // Get the download URL
    return imageUrl;
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('user_id',loginUser)
      formData.append('name', name)
      formData.append('bio', bio)
      formData.append('location', location)
      if (name !=loginName ){
        setLoginName(name)
      }
      // Upload profile and header images if selected
      const profileImageUrl = userProfileImg ? await uploadImage(userProfileImg, `profile_images/${encodeURIComponent(userProfileImg.name)}`) : userData.user_profile_img;
      const headerImageUrl = headerImg ? await uploadImage(headerImg, `header_images/${encodeURIComponent(headerImg.name)}`) : userData.header;

      // プロフィール画像が更新された場合、グローバルステートに反映
      if (profileImageUrl) {
        setAvatarUrl(profileImageUrl);
      }

      // Include URLs in the form data
      formData.append('user_profile_img', profileImageUrl || '')
      formData.append('header', headerImageUrl || '')

      const response = await axios.put(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${loginUser}/update`, {
        user_id : loginUser,
        name : name,
        bio : bio,
        img_url : profileImageUrl,
        header_url : headerImageUrl,
        location : location
    });
    console.log('Server response:', response.data);


      
    onProfileUpdate(loginUser)
    onClose()
      
    } catch (err) {
      console.error('Profile update failed', err)
    }
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserProfileImg(e.target.files[0])
    }
  }

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHeaderImg(e.target.files[0])
    }
  }

  return (
    <Stack spacing={2}>
      {/* Profile Image */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          src={userProfileImg ? URL.createObjectURL(userProfileImg) : userData.user_profile_img || '/placeholder.svg'}
          alt="Profile"
          sx={{ width: 80, height: 80 }}
        />
        <Button variant="outlined" component="label">
          プロフィール画像を選択
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </Button>
      </Stack>

      {/* Header Image */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: '100%',
            height: 200,
            backgroundImage: `url(${headerImg ? URL.createObjectURL(headerImg) : userData.header || '/placeholder.svg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
          }}
        >
        </Box>
        <Button variant="outlined" component="label">
          ヘッダー画像を選択
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleHeaderImageChange}
          />
        </Button>
      </Stack>

      {/* Name, Bio, and Location */}
      <TextField label="名前" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField label="自己紹介" value={bio} onChange={(e) => setBio(e.target.value)} fullWidth multiline rows={4} />
      <TextField label="所在地" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth />

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        編集
      </Button>
    </Stack>
  )
}

export default ProfileUpdater
