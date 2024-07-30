// Cart.tsx
import React from 'react';
import { Button, List, ListItem, ListItemText, Typography, Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface CartItem {
  id: number;
  title: string;
  price: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    { id: 1, title: 'To Kill a Mockingbird', price: 20 },
    { id: 2, title: '1984', price: 15 },
  ]); // Example items

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListItem key={item.id} secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveItem(item.id)}>
                <ClearIcon />
              </IconButton>
            }>
              <ListItemText primary={item.title} secondary={`$${item.price.toFixed(2)}`} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            Your cart is empty.
          </Typography>
        )}
      </List>
      {cartItems.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
