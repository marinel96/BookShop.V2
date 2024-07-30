import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Import Link component
import Cart from "../pages/Cart"

const pages = [
  { name: 'Book Gallery', path: '/bookgallery' },
  { name: 'Log In', path: '/login' },
  { name: 'Register', path: '/register' },
  { name: 'Cart', path: '/Cart' },
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '20ch',
  },
}));

const Header: React.FC = () => {
  const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(null);

  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Book Library
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link} // Use Link component for navigation
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Shopping Cart">
              <IconButton key={Cart.name}
                component={Link} // Use Link component for navigation
                to={Cart.path}
               onClick={handleOpenCartMenu} sx={{ p: 0 }}>
                <ShoppingCartIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
          
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
