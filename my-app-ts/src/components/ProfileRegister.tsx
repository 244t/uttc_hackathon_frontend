import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { auth } from '../firebase'; // Firebase 認証
import { useNavigate } from 'react-router-dom'; // useNavigate をインポート
import { Image } from '@mui/icons-material'; // 画像アイコンをインポート
import { storage } from '../firebase'; // Firebaseストレージをインポート
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // ストレージのアップロード用関数をインポート
import axios from 'axios'; // axiosをインポート
import { useLoginUser } from '../contexts/LoginUserContext'; // LoginUserContextからuseLoginUserをインポート

const ProfileRegister: React.FC = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null); // プロフィール画像
  const [headerImage, setHeaderImage] = useState<File | null>(null); // ヘッダー画像
  const navigate = useNavigate(); // useNavigate を使用
  const { loginUser } = useLoginUser(); // loginUserは現在のログインユーザーIDを保持


  // 画像をFirebaseストレージにアップロードする関数
  const uploadImage = async (image: File, path: string) => {
    if (!image) return null;
    
    // Firebase Storageの参照を作成
    const imageRef = ref(storage, path);
    console.log(imageRef)
    // 画像のアップロード
    await uploadBytes(imageRef, image);
    
    // アップロードした画像のURLを取得
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // プロフィール画像とヘッダー画像をFirebaseにアップロード
    const profileImageUrl = profileImage ? await uploadImage(profileImage, `${encodeURIComponent(profileImage.name)}`) : null;
    const headerImageUrl = headerImage ? await uploadImage(headerImage, `${encodeURIComponent(headerImage.name)}`) : null;
    console.log(profileImageUrl)
  
    // Axiosを使用してサーバーにPOSTリクエストを送信
    try {
        const response = await axios.post('https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/register', {
            user_id : loginUser,
            name : name,
            bio : bio,
            img_url : profileImageUrl,
            header_url : headerImageUrl,
            location : location
        });
        console.log('Server response:', response.data);

        // レスポンスを受け取ったら、プロフィールページに遷移
        navigate(`/user/${loginUser}`);
    } catch (error) {
        console.error('Error submitting data:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="名前"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        id="bio"
        label="自己紹介"
        name="bio"
        multiline
        rows={4}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        id="location"
        label="所在地"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* プロフィール画像選択 */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          プロフィール画像
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<Image />}
          fullWidth
        >
          画像を選択
          <input
            type="file"
            hidden
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            accept="image/*"
          />
        </Button>
        {profileImage && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            選択された画像: {profileImage.name}
          </Typography>
        )}
      </Box>

      {/* ヘッダー画像選択 */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          ヘッダー画像
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<Image />}
          fullWidth
        >
          画像を選択
          <input
            type="file"
            hidden
            onChange={(e) => setHeaderImage(e.target.files?.[0] || null)}
            accept="image/*"
          />
        </Button>
        {headerImage && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            選択された画像: {headerImage.name}
          </Typography>
        )}
      </Box>

      {/* サインアップボタン */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        プロフィールを保存
      </Button>
    </Box>
  );
};

export default ProfileRegister;
