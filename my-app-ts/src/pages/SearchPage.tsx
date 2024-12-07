import React, { useState } from 'react';
import { Box, Grid, useTheme, useMediaQuery, Tabs, Tab } from '@mui/material';
import Sidebar from '../components/Siadebar';
import RecommendUser from '../components/RecommendUser';
import SearchSection from '../components/EmbeddingSearch'; // Assuming this is the EmbeddingSearch component
import NameSearchSection from '../components/NameSearch'; // Assuming this is the NameSearch component

const SearchPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0); // State to track selected tab
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue); // Update the selected tab
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Left section for tabs and search */}
          <Grid item xs={12} md={6} sx={{ height: '100%', borderRight: 1, borderColor: 'divider' }}>
            {/* Tabs for switching between search sections */}
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="特徴検索" />
              <Tab label="名前検索" />
            </Tabs>

            {/* Conditionally render the SearchSection based on the selected tab */}
            {selectedTab === 0 && <SearchSection />} {/* EmbeddingSearch */}
            {selectedTab === 1 && <NameSearchSection />} {/* NameSearch */}
          </Grid>

          {/* Right section for recommended users */}
          <Grid item xs={12} md={6} sx={{
            height: '100%',
            display: { xs: isMobile ? 'none' : 'block' },
            overflow: 'auto'
          }}>
            <Box sx={{ height: '100%' }}>
              <RecommendUser />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchPage;
