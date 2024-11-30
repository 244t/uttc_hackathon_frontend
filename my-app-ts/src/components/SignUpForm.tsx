import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, createUser } from '../firebase';
import { useLoginUser } from '../contexts/LoginUserContext'; // LoginUserContextからuseLoginUserをインポート

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // LoginUserContextを使用してloginUserを更新する関数
  const { setLoginUser } = useLoginUser(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Firebase 認証のサインアップ処理
      const userCredential = await createUser(auth, email, password);
      console.log('User created:', userCredential.user);

      // FirebaseのuserIdをLoginUserContextにセット
      setLoginUser(userCredential.user.uid); // ここでloginUserの状態を更新

      // サインアップが成功したら、プロフィール入力ページに遷移
      navigate('/profile');
    } catch (error: any) {
      console.error('Error signing up:', error);
      setError(error.message); // エラーメッセージをセット
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        サインアップ
      </Typography>
      {/* メールアドレス入力フィールド */}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="メールアドレス"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* パスワード入力フィールド */}
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="パスワード"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* エラーメッセージ */}
      {error && (
        <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {error}
        </Typography>
      )}
      {/* サインアップボタン */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        サインアップ
      </Button>
    </Box>
  );
};

export default SignUpForm;
