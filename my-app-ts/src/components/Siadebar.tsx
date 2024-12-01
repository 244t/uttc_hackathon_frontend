// import React from 'react';
// import { Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
// import { Home, Search, Notifications, Mail, BookmarkBorder, ListAlt, PermIdentity, MoreHoriz, Twitter } from '@mui/icons-material';
// import { Link } from 'react-router-dom';

// const sidebarItems = [
//   { icon: <Home />, text: 'ホーム', path: '/' },
//   { icon: <Search />, text: '検索', path: '/search' },
//   { icon: <Notifications />, text: '通知', path: '/notifications' },
//   { icon: <Mail />, text: 'メッセージ', path: '/messages' },
//   { icon: <BookmarkBorder />, text: 'ブックマーク', path: '/bookmarks' },
//   { icon: <ListAlt />, text: 'リスト', path: '/lists' },
//   { icon: <PermIdentity />, text: 'プロフィール', path: '/profile' },
// ];

// const Sidebar: React.FC = () => {
//   return (
//     <Box sx={{ width: 275, height: '100vh', borderRight: 1, borderColor: 'divider' }}>
//       <IconButton sx={{ m: 1, color: 'primary.main' }}>
//         <Twitter fontSize="large" />
//       </IconButton>
//       <List>
//         {sidebarItems.map((item) => (
//           <ListItemButton
//             key={item.text}
//             component={Link}
//             to={item.path}
//             sx={{ textDecoration: 'none' }}  // Remove underline for links
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
// import React from 'react';
// import { Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
// import { Home, Search, Notifications, Mail, BookmarkBorder, ListAlt, PermIdentity, MoreHoriz, Twitter } from '@mui/icons-material';
// import { Link } from 'react-router-dom';

// const sidebarItems = [
//   { icon: <Home />, text: 'ホーム', path: '/' },
//   { icon: <Search />, text: '検索', path: '/search' },
//   { icon: <Notifications />, text: '通知', path: '/notifications' },
//   { icon: <Mail />, text: 'メッセージ', path: '/messages' },
//   { icon: <BookmarkBorder />, text: 'ブックマーク', path: '/bookmarks' },
//   { icon: <ListAlt />, text: 'リスト', path: '/lists' },
//   { icon: <PermIdentity />, text: 'プロフィール', path: '/profile' },
// ];

// const Sidebar: React.FC = () => {
//   return (
//     <Box sx={{ 
//       height: '100vh', 
//       position: 'fixed', // 追加: サイドバーを固定位置に設定
//       borderRight: 1, 
//       borderColor: 'divider',
//       overflowY: 'auto'  // 必要であればスクロールを許可
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
//             sx={{ textDecoration: 'none' }}  // Remove underline for links
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
import { Home, Search, Notifications, Mail, BookmarkBorder, ListAlt, PermIdentity, MoreHoriz, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useLoginUser } from '../contexts/LoginUserContext';


const Sidebar: React.FC = () => {
  const { loginUser } = useLoginUser(); 
  const sidebarItems = [
    { icon: <Home />, text: 'ホーム', path: '/timeline' },
    { icon: <Search />, text: '検索', path: '/search' },
    { icon: <Notifications />, text: '通知', path: '/notifications' },
    { icon: <Mail />, text: 'メッセージ', path: '/messages' },
    { icon: <BookmarkBorder />, text: 'ブックマーク', path: '/bookmarks' },
    { icon: <ListAlt />, text: 'リスト', path: '/lists' },
    { icon: <PermIdentity />, text: 'プロフィール', path: `/user/${loginUser}` },
  ];
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
      </List>
    </Box>
  );
};

export default Sidebar;

