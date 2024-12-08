// import React, { useState, useEffect } from 'react';
// import { Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Popover, Typography, Badge, Avatar } from '@mui/material';
// import { Home, Search, Notifications as NotificationsIcon, PermIdentity, MoreHoriz, Twitter, Logout } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { useLoginUser } from '../contexts/LoginUserContext';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase'; // Firebase設定ファイル
// import { useNavigate } from 'react-router-dom';

// const Sidebar: React.FC = () => {
//   const { loginUser, setLoginUser } = useLoginUser();
//   const navigate = useNavigate();

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [isNotificationsActive, setIsNotificationsActive] = useState<boolean>(false);

//   const sidebarItems = [
//     { icon: <Home />, text: 'ホーム', path: '/timeline' },
//     { icon: <Search />, text: '検索', path: '/search' },
//     { icon: <PermIdentity />, text: 'プロフィール', path: `/user/${loginUser}` },
//   ];

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${loginUser}/notification`);
//         const data = await response.json();
//         if (data) {
//           setNotifications(data);
//         } else {
//           setNotifications([]);
//         }
//       } catch (error) {
//         console.error('通知の取得に失敗しました:', error);
//       }
//     };

//     fetchNotifications();
//   }, [loginUser]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setLoginUser('');
//       localStorage.removeItem('loginUser');
//       navigate('/');
//     } catch (error) {
//       console.error('ログアウトに失敗しました:', error);
//     }
//   };

//   const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//     setIsNotificationsActive(!isNotificationsActive);
//   };

//   const handleClosePopover = () => {
//     setAnchorEl(null);
//     setIsNotificationsActive(false);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <Box sx={{
//       width: '275px',
//       height: '100vh',
//       position: 'sticky',
//       top: 0,
//       borderRight: 1,
//       borderColor: 'divider',
//       overflowY: 'auto',
//       flexShrink: 0,
//       display: 'flex',
//       flexDirection: 'column',
//     }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <IconButton sx={{ m: 1, color: 'primary.main' }}>
//           <Twitter fontSize="large" />
//         </IconButton>

//         <IconButton
//           onClick={handleNotificationClick}
//           sx={{
//             color: isNotificationsActive ? 'white' : 'text.primary',
//             backgroundColor: isNotificationsActive ? 'primary.main' : 'transparent',
//             '&:hover': {
//               backgroundColor: isNotificationsActive ? 'primary.main' : 'rgba(0, 0, 0, 0.08)',
//             },
//             m: 1
//           }}
//         >
//           <Badge
//             badgeContent={notifications.length}
//             color="error"
//             sx={{
//               '& .MuiBadge-dot': {
//                 width: 12,
//                 height: 12,
//                 borderRadius: '50%',
//                 top: 6,
//                 right: 6,
//               }
//             }}
//           >
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//       </Box>

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

//         <ListItemButton onClick={handleLogout} sx={{ textDecoration: 'none' }}>
//           <ListItemIcon sx={{ color: 'text.primary' }}><Logout /></ListItemIcon>
//           <ListItemText primary="ログアウト" />
//         </ListItemButton>
//       </List>

//       {/* 通知のポップアップ */}
//       <Popover
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClosePopover}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//       >
//         <Box sx={{ p: 2, width: '300px', maxHeight: '400px', overflowY: 'auto' }}>
//           <Typography variant="h6" gutterBottom>通知</Typography>
//           {notifications.length === 0 ? (
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>新しい通知はありません。</Typography>
//           ) : (
//             notifications.map((notification, index) => (
//               <Box key={index} sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 mb: 2,
//                 borderBottom: '1px solid',
//                 borderColor: 'divider',
//                 p: 1,
//                 borderRadius: '8px',
//                 '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' }
//               }}>
//                 <Avatar alt={notification.name} src={notification.profile_img} sx={{ mr: 2 }} />
//                 <Box>
//                   <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                     <Link to={`/user/${notification.user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                       {notification.name}
//                     </Link>
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     {notification.flag === 'follow'
//                       ? `${notification.name}さんがあなたをフォローしました。`
//                       : `${notification.name}さんがあなたの投稿にいいねしました。`}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))
//           )}
//         </Box>
//       </Popover>
//     </Box>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Popover, Typography, Badge, Avatar, IconButton as MuiIconButton } from '@mui/material';
import { Home, Search, Notifications as NotificationsIcon, PermIdentity, MoreHoriz, Twitter, Logout, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useLoginUser } from '../contexts/LoginUserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { loginUser, setLoginUser } = useLoginUser();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationsActive, setIsNotificationsActive] = useState<boolean>(false);

  const sidebarItems = [
    { icon: <Home />, text: 'ホーム', path: '/timeline' },
    { icon: <Search />, text: '検索', path: '/search' },
    { icon: <PermIdentity />, text: 'プロフィール', path: `/user/${loginUser}` },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${loginUser}/notification`);
        const data = await response.json();
        if (data) {
          setNotifications(data);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error('通知の取得に失敗しました:', error);
      }
    };

    fetchNotifications();
  }, [loginUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoginUser('');
      localStorage.removeItem('loginUser');
      navigate('/');
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
    }
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsNotificationsActive(!isNotificationsActive);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setIsNotificationsActive(false);
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/notification/${notificationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.notification_id !== notificationId)
        );
        console.log('通知が削除されました');
      } else {
        console.error('通知の削除に失敗しました');
      }
    } catch (error) {
      console.error('通知の削除中にエラーが発生しました:', error);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{
      width: '275px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      borderRight: 1,
      borderColor: 'divider',
      overflowY: 'auto',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton sx={{ m: 1, color: 'primary.main' }}>
          <Twitter fontSize="large" />
        </IconButton>

        {/* アイコンの横にロゴを追加 */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            ml: 0, // アイコンとの間隔を調整
            textAlign: 'left', // 左詰め
            fontFamily: 'Caveat', // フォントの指定
          }}
        >
          Aoi Tori
        </Typography>

        <IconButton
          onClick={handleNotificationClick}
          sx={{
            color: isNotificationsActive ? 'white' : 'text.primary',
            backgroundColor: isNotificationsActive ? 'primary.main' : 'transparent',
            '&:hover': {
              backgroundColor: isNotificationsActive ? 'primary.main' : 'rgba(0, 0, 0, 0.08)',
            },
            m: 1
          }}
        >
          <Badge
            badgeContent={notifications.length}
            color="error"
            sx={{
              '& .MuiBadge-dot': {
                width: 12,
                height: 12,
                borderRadius: '50%',
                top: 6,
                right: 6,
              }
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>

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

        <ListItemButton onClick={handleLogout} sx={{ textDecoration: 'none' }}>
          <ListItemIcon sx={{ color: 'text.primary' }}><Logout /></ListItemIcon>
          <ListItemText primary="ログアウト" />
        </ListItemButton>
      </List>

      {/* 通知のポップアップ */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: '300px', maxHeight: '400px', overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>通知</Typography>
          {notifications.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>新しい通知はありません。</Typography>
          ) : (
            notifications.map((notification, index) => (
              <Box key={index} sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                p: 1,
                borderRadius: '8px',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' }
              }}>
                <Avatar alt={notification.name} src={notification.profile_img} sx={{ mr: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    <Link to={`/user/${notification.user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {notification.name}
                    </Link>
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {notification.flag === 'follow'
                      ? `${notification.name}さんがあなたをフォローしました。`
                      : `${notification.name}さんがあなたの投稿にいいねしました。`}
                  </Typography>
                </Box>
                <MuiIconButton onClick={() => handleDeleteNotification(notification.notification_id)} sx={{ ml: 1 }}>
                  <Delete sx={{ color: 'white' }} />
                </MuiIconButton>
              </Box>
            ))
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default Sidebar;
