import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';  // Linkコンポーネントをインポート
import axios from 'axios';

interface User {
  id: string;
  name: string;
  img_url: string;
  bio: string;
  location: string;
  header: string;
}

const UserList: React.FC<{ userId: string, mode: string }> = ({ userId, mode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // APIからデータを取得
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${userId}/${mode}`);
      const data = response.data;

      // データが存在しない場合は、空の配列を返す
      if (!data || data.length === 0) {
        setUsers([]);  // 空の配列を設定
      } else {
        // 取得したデータを設定
        const usersData = data.map((user: any) => ({
          id: user.user_id,
          name: user.name,
          img_url: user.img_url,
          bio: user.bio,
          location: user.location,  // location を追加
          header: user.header_url,      // header を追加
        }));
        
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUsers([]); // エラー発生時は空の配列を設定
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userId, mode]); // userId または mode が変更されるたびにデータを取得

  return (
    <Box sx={{ p: 2 }}>
      {loading ? (
        <Typography>読み込み中...</Typography>
      ) : users.length === 0 ? (
        <Typography>{mode === `following` ?   'フォローしている人はいません。': 'フォローワーはいません。'}</Typography> // 空の場合のメッセージ
      ) : (
        <Grid container direction="column" spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} key={user.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  backgroundImage: `url(${user.header})`, // user.header をカードの背景画像として設定
                  backgroundSize: 'cover', // 画像をカードのサイズに合わせてカバー
                  backgroundPosition: 'center', // 画像を中央に配置
                  height: '300px', // カードの高さを指定（任意で調整）
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // 変化のスムーズさ
                  '&:hover': {
                    transform: 'scale(1)', // ホバー時に少し大きくなる
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // 浮き上がる効果を与える影
                  },
                }}
              >
                {/* 黒いオーバーレイを重ねる */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)', // 上から下にかけて黒くなるグラデーション
                    zIndex: 1,
                  }}
                />
                
                {/* ユーザーのアバター（画像） */}
                <Avatar
                  alt={user.name}
                  src={user.img_url}
                  sx={{
                    width: 80,
                    height: 80,
                    marginTop: 'auto', // カードの下部に配置
                    marginBottom: 5, // 余白を追加
                    zIndex: 2, // オーバーレイの上に配置
                    alignSelf: 'center', // アバターを中央に配置
                  }}
                />
                
                {/* ユーザー情報 */}
                <CardContent sx={{ textAlign: 'center', zIndex: 2, color: 'white' }}>
                  {/* 名前にリンクを追加 */}
                  <Typography variant="h6">
                    <Link to={`/user/${user.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                      {user.name}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">{user.bio}</Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>@{user.location}</Typography> {/* locationを表示 */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserList;