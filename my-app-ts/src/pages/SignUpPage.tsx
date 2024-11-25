import { Container, Paper, Typography, ThemeProvider, createTheme } from '@mui/material';
import SignUpForm from '../components/SignUpForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DA1F2', // Twitter blue
    },
  },
});

const SignUpPage : React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Twitterに登録する
          </Typography>
          <SignUpForm />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpPage;