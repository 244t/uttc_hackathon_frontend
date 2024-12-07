import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Divider, IconButton, Grid, Card, CardContent, Avatar, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

// Define the interface for a User
interface User {
  user_id: string;
  name: string;
  img_url: string;
  bio: string;
  location: string;
  header_url: string;
}

const SearchSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);  // Specify the type as User[]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle search button click and fetch data from API
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]); // Clear results if input is empty
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://uttc-hackathon-backend-951630660755.us-central1.run.app/find-similar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search_word: searchTerm }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);  // The data is assumed to be an array of users
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error during search:', err);
      setError('検索中にエラーが発生しました');
    }

    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.default' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#FFF' }}>
            ユーザーを検索
          </Typography>
        </Box>
        <Divider />
      </Box>

      {/* Search input */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <TextField
          label="ユーザーを検索"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          variant="outlined"
          sx={{
            marginTop: 2,
            width: '95%', 
          }}
        />
      </Box>


      {/* Search Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch} // Trigger the search on button click
          sx={{ 
            marginTop: 2,
            width : '95%',
          }}
        >
          検索
        </Button>
      </Box>

      {/* Display loading or error */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography variant="body2" color="error">{error}</Typography>}

      {/* Display search results */}
      <Box sx={{ flex: 1, overflow: 'auto', mt: 2 }}>
        {searchResults.length > 0 ? (
          <Grid container direction="column" spacing={2}>
            {searchResults.map((user) => (
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
  );
};

export default SearchSection;
