// import React from 'react';
// import { Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
// import { Home, Search, Notifications, Mail, BookmarkBorder, ListAlt, PermIdentity, MoreHoriz, Twitter } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { useLoginUser } from '../contexts/LoginUserContext';


// const Sidebar: React.FC = () => {
//   const { loginUser } = useLoginUser(); 
//   const sidebarItems = [
//     { icon: <Home />, text: 'ホーム', path: '/timeline' },
//     { icon: <Search />, text: '検索', path: '/search' },
//     { icon: <Notifications />, text: '通知', path: '/notifications' },
//     { icon: <PermIdentity />, text: 'プロフィール', path: `/user/${loginUser}` },
//   ];
//   return (
//     <Box sx={{ 
//       width: '275px', // Added fixed width
//       height: '100vh', 
//       position: 'sticky', // Changed from 'fixed' to 'sticky'
//       top: 0, // Added to work with 'sticky'
//       borderRight: 1, 
//       borderColor: 'divider',
//       overflowY: 'auto',
//       flexShrink: 0, // Prevent sidebar from shrinking
//     }}>
//       <IconButton sx={{ m: 1, color: 'primary.main' }}>
//         <Twitter fontSize="large" />
//       </IconButton>
//       <List>
//         {sidebarItems.map((item) => (
//           <ListItemButton
//             key={item.text}
//             component={Link}
//             to={item.path}
//             sx={{ textDecoration: 'none' }}
//           >
//             <ListItemIcon sx={{ color: 'text.primary' }}>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItemButton>
//         ))}
//         <ListItemButton sx={{ textDecoration: 'none' }}>
//           <ListItemIcon sx={{ color: 'text.primary' }}><MoreHoriz /></ListItemIcon>
//           <ListItemText primary="もっと見る" />
//         </ListItemButton>
//       </List>
//     </Box>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, Search, Notifications, PermIdentity, MoreHoriz, Twitter, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useLoginUser } from '../contexts/LoginUserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Firebase設定ファイル
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { loginUser ,setLoginUser} = useLoginUser(); 
  const navigate = useNavigate(); // useNavigateフックを使用してナビゲーションを取得

  const sidebarItems = [
    { icon: <Home />, text: 'ホーム', path: '/timeline' },
    { icon: <Search />, text: '検索', path: '/search' },
    { icon: <Notifications />, text: '通知', path: '/notifications' },
    { icon: <PermIdentity />, text: 'プロフィール', path: `/user/${loginUser}` },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebaseでログアウト
      setLoginUser(''); // ログインユーザーをリセット
      localStorage.removeItem('loginUser'); // ローカルストレージからも削除
      console.log('ログアウトしました');
      navigate('/'); // ログアウト後、トップページへリダイレクト
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
    }
  };

  return (
    <Box sx={{ 
      width: '275px', // Added fixed width
      height: '100vh', 
      position: 'sticky', // Changed from 'fixed' to 'sticky'
      top: 0, // Added to work with 'sticky'
      borderRight: 1, 
      borderColor: 'divider',
      overflowY: 'auto',
      flexShrink: 0, // Prevent sidebar from shrinking
    }}>
      <IconButton sx={{ m: 1, color: 'primary.main' }}>
        <Twitter fontSize="large" />
      </IconButton>
      <List>
        {sidebarItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ textDecoration: 'none' }}
          >
            <ListItemIcon sx={{ color: 'text.primary' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        <ListItemButton sx={{ textDecoration: 'none' }}>
          <ListItemIcon sx={{ color: 'text.primary' }}><MoreHoriz /></ListItemIcon>
          <ListItemText primary="もっと見る" />
        </ListItemButton>
        {/* ログアウトボタン */}
        <ListItemButton onClick={handleLogout} sx={{ textDecoration: 'none' }}>
          <ListItemIcon sx={{ color: 'text.primary' }}><Logout /></ListItemIcon>
          <ListItemText primary="ログアウト" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
