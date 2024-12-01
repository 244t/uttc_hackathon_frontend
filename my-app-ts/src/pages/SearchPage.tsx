// import React, { useState } from 'react'; 
// import { Box, TextField, List, ListItem, Typography, IconButton, Divider, Grid, Card, CardContent, Avatar, useTheme, useMediaQuery } from '@mui/material';
// import Sidebar from '../components/Siadebar'; // Corrected spelling of 'Siadebar' -> 'Sidebar'
// import RefreshIcon from '@mui/icons-material/Refresh';

// const SearchPage: React.FC = () => {
//   const [prev, setPrev] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedUser, setSelectedUser] = useState<string | null>(null); // Added state for selected user
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   // Handle search change and fetch data from API
//   const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setPrev(value);

//     if (value.trim() === '') {
//       setSearchResults([]); // Clear results if input is empty
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/search', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ search_word: value }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSearchResults(data);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error);
//         setSearchResults([]);
//       }
//     } catch (err) {
//       console.error('Error during search:', err);
//       setError('An error occurred while searching');
//     }

//     setLoading(false);
//   };

//   return (
//     <Box sx={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
//         <Grid container sx={{ height: '100%' }}>
//           {/* Left section for search */}
//           <Grid item xs={12} md={6} sx={{ height: '100%', borderRight: 1, borderColor: 'divider' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//               <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.default' }}>
//                 <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography variant="h6">ユーザーを検索</Typography>
//                   <IconButton>
//                     <RefreshIcon />
//                   </IconButton>
//                 </Box>
//                 <Divider />
//               </Box>

//               {/* Search input */}
//               <TextField
//                 fullWidth
//                 label="ユーザーを検索"
//                 value={prev}
//                 onChange={handleSearchChange}
//                 variant="outlined"
//                 sx={{ marginTop: 2 }}
//               />

//               {/* Display loading or error */}
//               {loading && <Typography variant="body2">検索中...</Typography>}
//               {error && <Typography variant="body2" color="error">{error}</Typography>}

//               Display search results
//               <Box sx={{ flex: 1, overflow: 'auto', mt: 2 }}>
//                 {searchResults.length > 0 ? (
//                   <Grid container spacing={2}>
//                     {searchResults.map((user: { user_id: string, name: string, img_url: string, bio: string, location: string }) => (
//                       <Grid item xs={12} sm={6} md={4} key={user.user_id}>
//                         <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
//                           {/* Background image for the card */}
//                           <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${user.img_url})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }} />
                          
//                           {/* Avatar */}
//                           <Avatar alt={user.name} src={user.img_url} sx={{ width: 80, height: 80, marginTop: 3 }} />
                          
//                           {/* User info */}
//                           <CardContent sx={{ textAlign: 'center' }}>
//                             <Typography variant="h6">{user.name}</Typography>
//                             <Typography variant="body2" color="textSecondary">{user.bio}</Typography>
//                             <Typography variant="body2" sx={{ fontStyle: 'italic' }}>@{user.location}</Typography>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 ) : (
//                   <Typography variant="body2">結果はありません</Typography>
//                 )}
//               </Box>
//             </Box>
//           </Grid>

//           {/* Right section for user details or further info */}
//           <Grid item xs={12} md={6} sx={{
//             height: '100%',
//             display: { xs: isMobile && !selectedUser ? 'none' : 'block' },
//             overflow: 'auto'
//           }}>
//             <Box sx={{ height: '100%' }}>
//               {/* Placeholder for user details */}
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default SearchPage;

import React, { useState } from 'react'; 
import { Box, TextField, Grid, Typography, Avatar, Card, CardContent, Divider, IconButton, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from '../components/Siadebar'; // Corrected spelling of 'Siadebar' -> 'Sidebar'
import RefreshIcon from '@mui/icons-material/Refresh';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SearchPage: React.FC = () => {
  const [prev, setPrev] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle search change and fetch data from API
  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrev(value);

    if (value.trim() === '') {
      setSearchResults([]); // Clear results if input is empty
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search_word: value }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error during search:', err);
      setError('An error occurred while searching');
    }

    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Left section for search */}
          <Grid item xs={12} md={6} sx={{ height: '100%', borderRight: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.default' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">ユーザーを検索</Typography>
                  <IconButton>
                    <RefreshIcon />
                  </IconButton>
                </Box>
                <Divider />
              </Box>

              {/* Search input */}
              <TextField
                fullWidth
                label="ユーザーを検索"
                value={prev}
                onChange={handleSearchChange}
                variant="outlined"
                sx={{ marginTop: 2 }}
              />

              {/* Display loading or error */}
              {loading && <Typography variant="body2">検索中...</Typography>}
              {error && <Typography variant="body2" color="error">{error}</Typography>}

              {/* Display search results */}
              <Box sx={{ flex: 1, overflow: 'auto', mt: 2 }}>
                {searchResults ? (
                  <Grid container direction="column" spacing={2}>
                    {searchResults.map((user: { user_id: string, name: string, img_url: string, bio: string, location: string, header_url: string }) => (
                      <Grid item xs={12} key={user.user_id}>
                        <Card
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            backgroundImage: `url(${user.header_url})`, // Background image for the card
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            paddingLeft: 2, // Left padding inside the card
                            paddingRight: 2, // Right padding inside the card
                          }}
                        >
                          {/* Overlay */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
                              zIndex: 1,
                            }}
                          />
                          
                          {/* Avatar */}
                          <Avatar
                            alt={user.name}
                            src={user.img_url}
                            sx={{
                              width: 80,
                              height: 80,
                              marginTop: 'auto',
                              marginBottom: 5,
                              zIndex: 2,
                              alignSelf: 'center',
                            }}
                          />

                          {/* User Info */}
                          <CardContent sx={{ textAlign: 'center', zIndex: 2, color: 'white' }}>
                            {/* Link added here for navigation */}
                            <Typography variant="h6">
                              <Link to={`/user/${user.user_id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                {user.name}
                              </Link>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">{user.bio}</Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>@{user.location}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2">結果はありません</Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Right section for user details or further info */}
          <Grid item xs={12} md={6} sx={{
            height: '100%',
            display: { xs: isMobile && !selectedUser ? 'none' : 'block' },
            overflow: 'auto'
          }}>
            <Box sx={{ height: '100%' }}>
              {/* Placeholder for user details */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchPage;
