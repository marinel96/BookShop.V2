import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Data } from '../pages/BookGallery';

interface BookModalProps {
  open: boolean;
  book: Data | null;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BookDetails: React.FC<BookModalProps> = ({ open, book, onClose }) => {
  if (!book) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {book.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Author: {book.author}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Genre: {book.genre}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Pages: {book.pages}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Published Year: {book.publishedYear}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Price: ${book.price}
        </Typography>
      </Box>
    </Modal>
  );
};

export default BookDetails;
