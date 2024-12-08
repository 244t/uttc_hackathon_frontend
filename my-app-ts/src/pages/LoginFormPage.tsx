// import { Box,IconButton,Container, Paper, Typography, ThemeProvider, createTheme } from '@mui/material';
// import {Twitter} from '@mui/icons-material';
// import LoginForm from '../components/LoginForm';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1DA1F2', // Twitter blue
//     },
//   },
// });

// const LoginPage : React.FC = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
//           <IconButton sx={{ m: 1, color: 'primary.main' }}>
//             <Twitter fontSize="large" />
//           </IconButton>

//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 'bold',
//               color: 'primary.main',
//               ml: 0,
//               textAlign: 'left', // 左詰め
//               fontFamily: 'Caveat, sans-serif', // フォントの指定
//             }}
//           >
//             Aoi Tori
//           </Typography>
//         </Box>
//         <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
//           <Typography component="h1" variant="h5" align="center" gutterBottom>
//           </Typography>
//           <LoginForm />
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default LoginPage;

import { Box, IconButton, Container, Paper, Typography, ThemeProvider, createTheme } from '@mui/material';
import { Twitter } from '@mui/icons-material';
import LoginForm from '../components/LoginForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DA1F2', // Twitter blue
    },
  },
});

const LoginPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* アイコンとロゴを画面上部から30%の位置に配置 */}
        <Box
          sx={{
            position: 'absolute', // 絶対位置で配置
            top: '10%', // 上から30%の位置に配置
            left: '50%', // 水平中央に配置
            transform: 'translateX(-50%)', // 水平中央にするために中央揃え
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column', // アイコンとロゴを縦に並べる
            textAlign: 'center', // アイコンとロゴを中央に揃える
            zIndex: 1, // アイコンとロゴを前面に表示
          }}
        >
          {/* アイコンのサイズを大きくする */}
          <IconButton sx={{ m: 1, color: 'primary.main', fontSize: '80px' }}>
            <Twitter fontSize="inherit" />
          </IconButton>

          {/* ロゴのサイズを大きくする */}
          <Typography
            variant="h3" // 通常より大きいサイズに設定
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mt: 2, // アイコンとロゴの間隔を調整
              fontFamily: 'Caveat, sans-serif',
              fontSize: '3rem', // サイズを大きく指定
            }}
          >
            Aoi Tori
          </Typography>
        </Box>

        {/* ログインフォームのためのPaper */}
        <Paper elevation={3} sx={{ mt: '70%', p: 4 }}> {/* 上から50%の位置にフォームを配置 */}
          <Typography component="h1" variant="h5" align="center" gutterBottom>
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
