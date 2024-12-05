import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, signIn } from '../firebase'; // FirebaseからsignInWithEmailAndPasswordをインポート
import { useLoginUser } from '../contexts/LoginUserContext'; // LoginUserContextからuseLoginUserをインポート

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { setLoginUser } = useLoginUser(); //setLoginUserを取得

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Firebase 認証のログイン処理
      const userCredential = await signIn(auth, email, password);

      const userId = userCredential.user.uid; // ログインしたユーザーIDを取得

      // loginUserの状態を更新し、localStorageに保存
      setLoginUser(userId); // ログイン成功後にユーザーIDをセット

      // サインインが成功したら、プロフィールページに遷移
      navigate(`/user/${userId}`);
    } catch (error: any) {
      console.error('Error logging in:', error);
      setError(error.message); // エラーメッセージをセット
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); // サインアップページに遷移
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        ログイン
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
      {/* ログインボタン */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        ログイン
      </Button>
      {/* サインアップページへのリンク */}
      <Typography sx={{ textAlign: 'center', mt: 2 }}>
        アカウントをお持ちでない方?{' '}
        <Link component="button" variant="body2" onClick={handleSignUpRedirect}>
          サインアップ
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
