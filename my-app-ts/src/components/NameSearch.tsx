// import React, { useState } from 'react';
// import { Box, TextField, Grid, Typography, Avatar, Card, CardContent, Divider, IconButton, CircularProgress, Button, useTheme, useMediaQuery } from '@mui/material';
// import { Link } from 'react-router-dom';

// const SearchSection: React.FC = () => {
//   const [prev, setPrev] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedUser, setSelectedUser] = useState<string | null>(null);
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
//         setError(errorData.error || 'An error occurred');
//         setSearchResults([]);
//       }
//     } catch (err) {
//       console.error('Error during search:', err);
//       setError('An error occurred while searching');
//     }

//     setLoading(false);
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//       {/* Left section for search */}
//       <Box sx={{ flex: 1, overflow: 'hidden', bgcolor: 'background.default' }}>
//         <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.default', padding: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFF' }}>
//               ユーザーを検索
//             </Typography>
//           </Box>
//           <Divider sx={{ marginTop: 2 }} />
//         </Box>

//         {/* Search input */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//         <TextField
//           label="ユーザーを検索"
//           value={prev}
//           onChange={handleSearchChange}
//           variant="outlined"
//           sx={{ 
//             marginTop: 2,
//             width : '95%'
//            }}
//         />
//         </Box>

//         {/* Display loading or error */}
//         {loading && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//             <CircularProgress />
//           </Box>
//         )}
//         {error && <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>{error}</Typography>}

//         {/* Display search results */}
//         <Box sx={{ flex: 1, overflow: 'auto', mt: 2 }}>
//           {searchResults ? (
//             <Grid container direction="column" spacing={2}>
//               {searchResults.map((user: { user_id: string, name: string, img_url: string, bio: string, location: string, header_url: string }) => (
//                 <Grid item xs={12} key={user.user_id}>
//                   <Card
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center',
//                       position: 'relative',
//                       backgroundImage: `url(${user.header_url})`,
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       height: '300px',
//                       paddingLeft: 2,
//                       paddingRight: 2,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
//                         zIndex: 1,
//                       }}
//                     />
//                     <Avatar
//                       alt={user.name}
//                       src={user.img_url}
//                       sx={{
//                         width: 80,
//                         height: 80,
//                         marginTop: 'auto',
//                         marginBottom: 5,
//                         zIndex: 2,
//                         alignSelf: 'center',
//                       }}
//                     />
//                     <CardContent sx={{ textAlign: 'center', zIndex: 2, color: 'white' }}>
//                       <Typography variant="h6">
//                         <Link to={`/user/${user.user_id}`} style={{ color: 'white', textDecoration: 'none' }}>
//                           {user.name}
//                         </Link>
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">{user.bio}</Typography>
//                       <Typography variant="body2" sx={{ fontStyle: 'italic' }}>@{user.location}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Typography variant="body2">結果はありません</Typography>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SearchSection;
import React, { useState } from 'react';
import { Box, TextField, Grid, Typography, Avatar, Card, CardContent, Divider, IconButton, CircularProgress, Button, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const SearchSection: React.FC = () => {
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
        setError(errorData.error || 'An error occurred');
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error during search:', err);
      setError('An error occurred while searching');
    }

    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Left section for search */}
      <Box sx={{ flex: 1, overflow: 'hidden', bgcolor: 'background.default' }}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.default', padding: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFF' }}>
              ユーザーを検索
            </Typography>
          </Box>
          <Divider sx={{ marginTop: 2 }} />
        </Box>

        {/* Search input */}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <TextField
            label="ユーザーを検索"
            value={prev}
            onChange={handleSearchChange}
            variant="outlined"
            sx={{
              marginTop: 2,
              width: '95%',
            }}
          />
        </Box>

        {/* Display loading or error */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>{error}</Typography>}

        {/* Display search results */}
        <Box sx={{ flex: 1, overflowY: 'auto', mt: 2, maxHeight: 'calc(100vh - 200px)' }}>
          {searchResults && searchResults.length > 0 ? (
            <Grid container direction="column" spacing={2}>
              {searchResults.map((user: { user_id: string, name: string, img_url: string, bio: string, location: string, header_url: string }) => (
                <Grid item xs={12} key={user.user_id}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      backgroundImage: `url(${user.header_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '300px',
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                  >
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
                    <CardContent sx={{ textAlign: 'center', zIndex: 2, color: 'white' }}>
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
    </Box>
  );
};

export default SearchSection;
