// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Typography, Box, Grid, Divider, useMediaQuery, useTheme } from '@mui/material';
// import TweetList from '../components/TweetList';
// import Profile from "../components/Profile";
// import TweetDetail from "../components/TweetDetail";
// import Sidebar from '../components/Siadebar';

// const UserDetailPage: React.FC = () => {
//   const params = useParams();
//   const user_id = params.user_id as string;
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const [selectedTweet, setSelectedTweet] = useState<string | null>(null);

//   if (!user_id) {
//     return (
//       <Box sx={{ 
//         display: 'flex', 
//         width: '100vw',
//         height: '100vh',
//         overflow: 'hidden'
//       }}>
//         <Sidebar />
//         <Box sx={{ 
//           flexGrow: 1,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <Typography>ユーザーが見つかりません。</Typography>
//         </Box>
//       </Box>
//     );
//   }

//   const handleTweetClick = (tweetId: string) => {
//     setSelectedTweet(tweetId);
//   };

//   return (
//     <Box sx={{ 
//       display: 'flex', 
//       width: '100vw',
//       height: '100vh',
//       overflow: 'hidden'
//     }}>
//       <Sidebar />
//       <Box sx={{ 
//         flexGrow: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100%',
//         overflow: 'hidden',
//       }}>
//         <Grid container sx={{ height: '100%' }}>
//           <Grid item xs={12} md={6} sx={{ height: '100%', borderRight: 1, borderColor: 'divider' }}>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               height: '100%',
//               overflowY: 'auto', // 親コンテナがスクロールする
//             }}>
//               {/* Profile と TweetList を一緒にスクロール */}
//               <Box sx={{ flexShrink: 0 }}>
//                 <Profile user_id={user_id} />
//               </Box>

//               <Box sx={{ 
//                 borderBottom: '2px solid #E0E0E0', // 境界線の色と太さを設定
//                 my: 2 // 上下のマージンを調整
//               }} />

//               <Box sx={{ flex: 1 }}>
//                 <TweetList mode="user" user_id={user_id} />
//               </Box>
//             </Box>
//           </Grid>
          
//           <Grid item xs={12} md={6} sx={{ 
//             height: '100%', 
//             display: { xs: isMobile && !selectedTweet ? 'none' : 'block' },
//             overflow: 'auto'
//           }}>
//             <Box sx={{ 
//               height: '100%',
//             }}>
//               <TweetDetail />
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default UserDetailPage;
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Grid, useMediaQuery, useTheme, Tabs, Tab } from '@mui/material';
import TweetList from '../components/TweetList';
import Profile from "../components/Profile";
import TweetDetail from "../components/TweetDetail";
import Sidebar from '../components/Siadebar';
import UserList from '../components/UserList'; // 新たに追加

const UserDetailPage: React.FC = () => {
  const params = useParams();
  const user_id = params.user_id as string;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedTweet, setSelectedTweet] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState(0); // タブの状態管理

  if (!user_id) {
    return (
      <Box sx={{ 
        display: 'flex', 
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Sidebar />
        <Box sx={{ 
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography>ユーザーが見つかりません。</Typography>
        </Box>
      </Box>
    );
  }

  const handleTweetClick = (tweetId: string) => {
    setSelectedTweet(tweetId);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue); // タブが変更されたときにインデックスを更新
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Sidebar />
      <Box sx={{ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12} md={6} sx={{ height: '100%', borderRight: 1, borderColor: 'divider' }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              overflowY: 'auto', // 親コンテナがスクロールする
            }}>
              {/* Profile と TweetList を一緒にスクロール */}
              <Box sx={{ flexShrink: 0 }}>
                <Profile user_id={user_id} />
              </Box>

              <Box sx={{ 
                borderBottom: '2px solid #E0E0E0', // 境界線の色と太さを設定
                my: 2 // 上下のマージンを調整
              }} />

              {/* タブの表示 */}
              <Tabs value={tabIndex} onChange={handleTabChange} aria-label="user profile tabs">
                <Tab label="ツイート" />
                <Tab label="フォロワー" />
                <Tab label="フォロー" />
              </Tabs>

              {/* タブに応じたコンテンツの表示 */}
              <Box sx={{ flex: 1 }}>
                {tabIndex === 0 && <TweetList mode="user" user_id={user_id} />}
                {tabIndex === 1 && <UserList userId={user_id} mode={`followers`}/>}
                {tabIndex === 2 && <UserList userId={user_id} mode={`following`}/>} {/* フォローリストの表示 */}
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ 
            height: '100%', 
            display: { xs: isMobile && !selectedTweet ? 'none' : 'block' },
            overflow: 'auto'
          }}>
            <Box sx={{ 
              height: '100%',
            }}>
              <TweetDetail />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDetailPage;
