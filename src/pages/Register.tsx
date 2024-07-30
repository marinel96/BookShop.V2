import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom'; // Assuming you use React Router for navigation

const defaultTheme = createTheme();

enum FormMode {
  SignUp,
  SignIn,
}

export default function Auth() {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const [mode, setMode] = React.useState<FormMode>(FormMode.SignUp);

  const [formDataSignUp, setFormDataSignUp] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user', // Default role is 'user'
  });

  const [formDataSignIn, setFormDataSignIn] = React.useState({
    email: '',
    password: '',
  });

  const handleChangeSignUp = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name) { // Ensure 'name' exists in the target
      setFormDataSignUp(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleChangeSignIn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name) { // Ensure 'name' exists in the target
      setFormDataSignIn(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmitSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Save form data to local storage
    localStorage.setItem('userData', JSON.stringify(formDataSignUp));
    // Redirect to sign-in page
    navigate('/login'); // Use navigate instead of history.push
  };

  const handleSubmitSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Retrieve user from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      // Check if the email and password match
      if (userData.email === formDataSignIn.email && userData.password === formDataSignIn.password) {
        console.log('Sign-in successful');
        // Redirect to a different page or perform other actions
        navigate('/dashboard'); // Example redirection
      } else {
        console.log('Invalid email or password');
      }
    } else {
      console.log('No user data found');
    }
  };

  const switchMode = () => {
    setMode(mode === FormMode.SignUp ? FormMode.SignIn : FormMode.SignUp);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {mode === FormMode.SignUp ? 'Sign up' : 'Sign in'}
          </Typography>
          {mode === FormMode.SignUp && (
            <Box component="form" noValidate onSubmit={handleSubmitSignUp} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formDataSignUp.firstName}
                    onChange={handleChangeSignUp as React.ChangeEventHandler<HTMLInputElement>}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formDataSignUp.lastName}
                    onChange={handleChangeSignUp as React.ChangeEventHandler<HTMLInputElement>}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formDataSignUp.email}
                    onChange={handleChangeSignUp as React.ChangeEventHandler<HTMLInputElement>}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formDataSignUp.password}
                    onChange={handleChangeSignUp as React.ChangeEventHandler<HTMLInputElement>}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      value={formDataSignUp.role}
                      onChange={handleChangeSignUp as React.ChangeEventHandler<HTMLSelectElement>}
                      label="Role"
                      required
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={switchMode} color="primary">
                    Already have an account? Sign in
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
          {mode === FormMode.SignIn && (
            <Box component="form" noValidate onSubmit={handleSubmitSignIn} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formDataSignIn.email}
                onChange={handleChangeSignIn}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formDataSignIn.password}
                onChange={handleChangeSignIn}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button onClick={switchMode} color="primary">
                    Don't have an account? Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
