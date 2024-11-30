// import React, { useState } from 'react';
// import { Box, Typography, IconButton, Divider, Grid, useTheme, useMediaQuery } from '@mui/material';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import TweetList from '../components/TweetList';
// import TweetInput from '../components/InputTweet';
// import { useLoginUser } from '../contexts/LoginUserContext';
// import TweetDetail from '../components/TweetDetail';
// import Sidebar from '../components/Siadebar';

// const TimelinePage: React.FC = () => {
//   const { loginUser } = useLoginUser();
//   const [selectedTweet, setSelectedTweet] = useState<string | null>(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const handleTweetSubmit = async (tweetContent: string, imageUrl: string | null) => {
//     try {
//       const tweetData = {
//         user_id: loginUser,
//         content: tweetContent.trim(),
//         img_url: imageUrl || "",
//       };

//       const response = await fetch('https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(tweetData),
//       });

//       if (response.ok) {
//         console.log('Tweet successfully submitted');
//         // ここでツイートリストを更新するロジックを追加する
//       } else {
//         console.error('Error submitting tweet:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error submitting tweet:', error);
//     }
//   };


//   return (
    
//     <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
//       <Grid container sx={{ height: '100%' }}>
        
//         <Grid item xs={12} md={6} sx={{ height: '100%', overflow: 'auto', borderRight: 1, borderColor: 'divider' }}>
//           <Box sx={{
//             borderLeft: { xs: 0, md: 1 },
//             borderColor: 'divider',
//             height: '100%',
//           }}>
//             <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.default' }}>
//               <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="h6">ホーム</Typography>
//                 <IconButton>
//                   <RefreshIcon />
//                 </IconButton>
//               </Box>
//               <Divider />
//             </Box>

//             <TweetInput onTweetSubmit={handleTweetSubmit} />

//             {/* <Box sx={{ '& > *': { maxWidth: '100%' } }}>
//               <TweetList mode="timeline"/>
//             </Box> */}
//             <Box sx={{ width: '100%' }}>
//               <TweetList mode="timeline" />
//             </Box>
//           </Box>
//         </Grid>
        
//         <Grid item xs={12} md={6} sx={{ height: '100%', overflow: 'auto', display: { xs: isMobile && !selectedTweet ? 'none' : 'block' } }}>
//           <Box sx={{ 
//             width : '100%',
//             // borderRight: { xs: 0, md: 1 },
//             borderColor: 'divider',
//             height: '100%',
//           }}>
//             <TweetDetail />
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default TimelinePage;
import React, { useState } from 'react';
import { Box, Typography, IconButton, Divider, Grid, useTheme, useMediaQuery } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import TweetList from '../components/TweetList';
import TweetInput from '../components/InputTweet';
import { useLoginUser } from '../contexts/LoginUserContext';
import TweetDetail from '../components/TweetDetail';
import Sidebar from '../components/Siadebar';

const TimelinePage: React.FC = () => {
  const { loginUser } = useLoginUser();
  const [selectedTweet, setSelectedTweet] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTweetSubmit = async (tweetContent: string, imageUrl: string | null) => {
    try {
      const tweetData = {
        user_id: loginUser,
        content: tweetContent.trim(),
        img_url: imageUrl || "",
      };

      const response = await fetch('https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tweetData),
      });

      if (response.ok) {
        console.log('Tweet successfully submitted');
        // ここでツイートリストを更新するロジックを追加する
      } else {
        console.error('Error submitting tweet:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting tweet:', error);
    }
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
        overflow: 'hidden'
      }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12} md={6} sx={{ height: '100%', borderRight: 1, borderColor: 'divider' }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}>
              <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.default' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">ホーム</Typography>
                  <IconButton>
                    <RefreshIcon />
                  </IconButton>
                </Box>
                <Divider />
              </Box>

              <TweetInput onTweetSubmit={handleTweetSubmit} />

              <Box sx={{ flex: 1, overflow: 'auto' }}>
                <TweetList mode="timeline" />
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

export default TimelinePage;

