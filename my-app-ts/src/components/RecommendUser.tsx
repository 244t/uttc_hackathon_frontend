// import React, { useState, useEffect } from 'react';
// import { Box, Card, CardContent, Avatar, Typography, Grid } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useLoginUser } from '../contexts/LoginUserContext';

// interface User {
//   id: string;
//   name: string;
//   img_url: string;
//   bio: string;
//   location: string;
//   header: string;
// }

// const RecommendUser: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const { loginUser } = useLoginUser();  // Assuming `loginUser` is correctly provided from context
//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchRecommedUser = async () => {
//     setLoading(true);
//     if (!loginUser) {
//       console.error('No login user found!');
//       setLoading(false);
//       return;
//     }
    
//     try {
//       const response = await axios.get(
//         `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/recommend-user/${loginUser}`
//       );
//       const data = response.data;

//       if (!data || data.length === 0) {
//         setUsers([]);  // Empty array if no users are found
//       } else {
//         const usersData = data.map((user: any) => ({
//           id: user.user_id,
//           name: user.name,
//           img_url: user.img_url,
//           bio: user.bio,
//           location: user.location,
//           header: user.header_url,
//         }));
//         setUsers(usersData);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setUsers([]);  // Set to empty array if error occurs
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (loginUser) {
//       fetchRecommedUser();  // Fetch recommended users when loginUser is available
//     }
//   }, [loginUser]);  // Add loginUser to dependency array

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography>おすすめユーザー</Typography>
//       {loading ? (
//         <Typography>読み込み中...</Typography>
//       ) : users.length === 0 ? (
//         <Typography>おすすめユーザーがいません。</Typography>  // Improved message
//       ) : (
//         <Grid container direction="column" spacing={2}>
//           {users.map((user) => (
//             <Grid item xs={12} key={user.id}>
//               <Card
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   position: 'relative',
//                   backgroundImage: `url(${user.header})`, // Background image for the card
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   height: '300px',
//                 }}
//               >
//                 {/* Black overlay */}
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
//                     zIndex: 1,
//                   }}
//                 />

//                 {/* Avatar */}
//                 <Avatar
//                   alt={user.name}
//                   src={user.img_url}
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     marginTop: 'auto',
//                     marginBottom: 5,
//                     zIndex: 2,
//                     alignSelf: 'center',
//                   }}
//                 />

//                 {/* User info */}
//                 <CardContent sx={{ textAlign: 'center', zIndex: 2, color: 'white' }}>
//                   <Typography variant="h6">
//                     <Link to={`/user/${user.id}`} style={{ color: 'white', textDecoration: 'none' }}>
//                       {user.name}
//                     </Link>
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">{user.bio}</Typography>
//                   <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
//                     @{user.location}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default RecommendUser;
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Avatar, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLoginUser } from '../contexts/LoginUserContext';

interface User {
  id: string;
  name: string;
  img_url: string;
  bio: string;
  location: string;
  header: string;
}

const RecommendUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { loginUser } = useLoginUser();  
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecommedUser = async () => {
    setLoading(true);
    if (!loginUser) {
      console.error('No login user found!');
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(
        `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/recommend-user/${loginUser}`
      );
      const data = response.data;

      if (!data || data.length === 0) {
        setUsers([]);  
      } else {
        const usersData = data.map((user: any) => ({
          id: user.user_id,
          name: user.name,
          img_url: user.img_url,
          bio: user.bio,
          location: user.location,
          header: user.header_url,
        }));
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUsers([]);  
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loginUser) {
      fetchRecommedUser();  
    }
  }, [loginUser]);  

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#FFF' }}>おすすめユーザー</Typography>
      {loading ? (
        <Typography variant="body1" color="textSecondary">読み込み中...</Typography>
      ) : users.length === 0 ? (
        <Typography variant="body1" color="textSecondary">おすすめユーザーがいません。</Typography>
      ) : (
        <Grid container spacing={3} sx={{ overflow: 'hidden' }}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                sx={{
                  position: 'relative',
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  backgroundImage: `url(${user.header})`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                {/* Black overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
                    borderRadius: '12px',
                    zIndex: 1,
                  }}
                />
                
                {/* Avatar */}
                <Avatar
                  alt={user.name}
                  src={user.img_url}
                  sx={{
                    width: 90,
                    height: 90,
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    border: '4px solid white',
                    zIndex: 2,
                  }}
                />

                {/* User info */}
                <CardContent sx={{ textAlign: 'center', zIndex: 2, color: 'white', paddingBottom: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <Link to={`/user/${user.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                      {user.name}
                    </Link>
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    {user.bio}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    @{user.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecommendUser;
