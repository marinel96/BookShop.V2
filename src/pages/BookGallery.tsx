import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import BookModal from '../component/BookDetails'; // Importing the modal component

interface Data {
  id: number;
  title: string;
  author: string;
  genre: string;
  pages: number;
  publishedYear: number;
  price: number;
}

function createData(
  id: number,
  title: string,
  author: string,
  genre: string,
  pages: number,
  publishedYear: number
): Data {
  const price = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
  return {
    id,
    title,
    author,
    genre,
    pages,
    publishedYear,
    price,
  };
}

const rows = [
  createData(1, 'To Kill a Mockingbird', 'Harper Lee', 'Novel', 281, 1960),
  createData(2, '1984', 'George Orwell', 'Dystopian', 328, 1949),
  createData(3, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Novel', 180, 1925),
  createData(4, 'Pride and Prejudice', 'Jane Austen', 'Romance', 279, 1813),
  createData(5, 'The Catcher in the Rye', 'J.D. Salinger', 'Novel', 234, 1951),
  createData(6, 'Animal Farm', 'George Orwell', 'Political satire', 112, 1945),
  createData(7, 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 310, 1937),
  createData(8, 'Brave New World', 'Aldous Huxley', 'Dystopian', 311, 1932),
  createData(9, 'The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', 1178, 1954),
  createData(10, 'Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 'Fantasy', 309, 1997),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'author', numeric: false, disablePadding: false, label: 'Author' },
  { id: 'pages', numeric: true, disablePadding: false, label: 'Pages' },
  { id: 'publishedYear', numeric: true, disablePadding: false, label: 'Published Year' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all books' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Books
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('title');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Data | null>(null);
  const [cart, setCart] = useState<Data[]>([]); // Cart state

  // Check user role from local storage
  const userRole = localStorage.getItem('userRole');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddToCart = (book: Data) => {
    setCart((prevCart) => [...prevCart, book]); // Add book to cart
    console.log(`Adding book ${book.title} to the cart.`);
  };

  const handleEditBook = (book: Data) => {
    // Logic for editing the book
    console.log(`Editing book ${book.title}`);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBook(null);
  };

  const handleOpenModal = (book: Data) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.title}
                    </TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell align="right">{row.pages}</TableCell>
                    <TableCell align="right">{row.publishedYear}</TableCell>
                    <TableCell align="right">${row.price}</TableCell>
                    <TableCell align="right">
                      {userRole === 'user' && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAddToCart(row);
                          }}
                        >
                          Add to Cart
                        </Button>
                      )}
                      {userRole === 'admin' && (
                        <Button
                          variant="contained"
                          color="blue"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEditBook(row);
                          }}
                        >
                          Edit Book
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenModal(row);
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                sx={{ height: (dense ? 33 : 53) * emptyRows }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedBook && (
        <BookModal
          open={openModal}
          onClose={handleCloseModal}
          book={selectedBook}
        />
      )}
    </Paper>
  );
}
