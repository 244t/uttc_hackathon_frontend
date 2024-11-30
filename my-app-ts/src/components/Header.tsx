// import React from 'react';
// import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
// import { ArrowBack, Search } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// interface HeaderProps {
//   title: string;
//   showBackButton?: boolean;
//   showSearch?: boolean;
// }

// const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, showSearch = false }) => {
//   const navigate = useNavigate();

//   return (
//     <AppBar position="static" color="transparent" elevation={0}>
//       <Toolbar>
//         {showBackButton && (
//           <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
//             <ArrowBack />
//           </IconButton>
//         )}
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           {title}
//         </Typography>
//         {showSearch && (
//           <InputBase
//             placeholder="検索..."
//             startAdornment={<Search />}
//             sx={{ ml: 2, bgcolor: 'background.paper', borderRadius: 1, p: 0.5 }}
//           />
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, showSearch = false }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        {showBackButton && (
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
          {title}
        </Typography>
        {showSearch && (
          <InputBase
            placeholder="検索..."
            startAdornment={<Search sx={{ mr: 1, color: 'text.secondary' }} />}
            sx={{ 
              ml: 2, 
              bgcolor: 'background.paper', 
              borderRadius: 1, 
              p: 0.5, 
              '& .MuiInputBase-input': { 
                color: 'text.primary',
                '&::placeholder': {
                  color: 'text.secondary',
                  opacity: 1,
                },
              }
            }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

