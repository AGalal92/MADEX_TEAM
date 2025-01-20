import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TablePagination,
  TextField,
  TableSortLabel,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  CircularProgress,
  Box,
  Typography,
  Backdrop,
} from '@mui/material';
import { Edit, Delete, Search, FilterList, Clear } from '@mui/icons-material';
import Image from 'next/image';

const GenericTable = ({ data = [], loading, error, columns = [], onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dense, setDense] = useState(false); // Dense mode state
  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: true }), {})
  ); // All columns visible by default
  const [filters, setFilters] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDenseToggle = () => {
    setDense(!dense); // Toggle dense mode
  };

  const handleColumnVisibilityToggle = (field) => {
    setColumnVisibility((prev) => ({ ...prev, [field]: !prev[field] })); // Toggle column visibility
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({}); // Clear all filters
    setSearchTerm(''); // Clear global search
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderCellContent = (record, col) => {
    const cellValue = record[col.field];
    if (col.type === 'image' && cellValue) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src={cellValue}
            alt={col.label}
            width={50}
            height={50}
            style={{ objectFit: 'cover', borderRadius: '4px' }}
          />
        </Box>
      );
    }
    return cellValue || '-';
  };

  const filteredData = data?.filter((row) =>
    columns.some((col) => {
      const cellValue = row[col.field];
      return cellValue && cellValue.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  ).filter((row) =>
    Object.entries(filters).every(([field, value]) => !value || row[field] === value)
  );

  const sortedData = filteredData?.sort((a, b) => {
    if (orderBy) {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedData = sortedData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Dark mode colors
  const darkBackground = 'rgb(36, 48, 63)'; // Base dark color
  const lighterBackground = 'rgb(45, 57, 72)'; // Lighter variation
  const textColor = 'rgba(255, 255, 255, 0.87)'; // Light text for dark mode
  const hoverBackground = 'rgba(255, 255, 255, 0.08)'; // Hover effect for rows

  return (
    <Paper
      sx={{
        boxShadow: 3,
        borderRadius: '8px',
        overflowX: 'auto',
        p: 2,
        position: 'relative',
        backgroundColor: darkBackground, // Dark background for the entire table
        color: textColor, // Light text for dark mode
      }}
    >
      {/* Loading Overlay */}
      {loading && (
        <Backdrop open={loading} sx={{ position: 'absolute', zIndex: 1, color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {/* Custom Scrollbar Styling */}
      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: ${lighterBackground};
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
        `}
      </style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: textColor, mr: 1 }} />, // White search icon
            sx: {
              backgroundColor: lighterBackground, // Lighter background for search bar
              color: textColor, // Light text for dark mode
              borderRadius: '4px',
              '& .MuiInputBase-input': {
                color: textColor, // Ensure input text is white
              },
            },
          }}
          sx={{ width: '300px' }}
        />
        <div>
          <Tooltip title="Clear Filters">
            <IconButton onClick={handleClearFilters} sx={{ mr: 1, color: textColor }}>
              <Clear />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter">
            <IconButton onClick={handleMenuOpen} sx={{ color: textColor }}>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: 1 }}
            PaperProps={{
              sx: {
                backgroundColor: lighterBackground, // Lighter background for menu
                color: textColor, // Light text for dark mode
              },
            }}
          >
            <MenuItem>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Table Options
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dense}
                      onChange={handleDenseToggle}
                      color="primary"
                    />
                  }
                  label="Dense Padding"
                  sx={{ mb: 1, color: textColor }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Column Visibility
                </Typography>
                {columns.map((col) => (
                  <FormControlLabel
                    key={col.field}
                    control={
                      <Switch
                        checked={!columnVisibility[col.field]}
                        onChange={() => handleColumnVisibilityToggle(col.field)}
                        color="primary"
                      />
                    }
                    label={col.label}
                    sx={{ mb: 1, color: textColor }}
                  />
                ))}
              </Box>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <TableContainer sx={{ minHeight: 'calc(100vh - 400px)' }}>
        <Table stickyHeader size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {columns
                .filter((col) => !columnVisibility[col.field])
                .map((col) => (
                  <TableCell
                    key={col.field}
                    sortDirection={orderBy === col.field ? order : false}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: lighterBackground, // Lighter background for headers
                      color: textColor, // Light text for dark mode
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                      padding: !dense ? '8px 16px' : '10px 20px',
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === col.field}
                      direction={orderBy === col.field ? order : 'asc'}
                      onClick={() => handleRequestSort(col.field)}
                      sx={{ color: textColor }} // Light text for dark mode
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: lighterBackground, // Lighter background for headers
                  color: textColor, // Light text for dark mode
                  textAlign: 'center',
                  padding: !dense ? '8px 16px' : '10px 20px',
                  position: 'sticky',
                  right: 0,
                  zIndex: 2,
                  backdropFilter: 'blur(8px)',
                  boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : paginatedData?.length > 0 ? (
              paginatedData?.map((record) => (
                <TableRow
                  key={record.id}
                  hover
                  sx={{
                    '&:hover': { backgroundColor: hoverBackground }, // Hover effect for rows
                  }}
                >
                  {columns
                    .filter((col) => !columnVisibility[col.field])
                    .map((col) => (
                      <TableCell
                        key={col.field}
                        sx={{
                          whiteSpace: 'nowrap',
                          textAlign: 'center',
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          padding: '8px 16px',
                          color: textColor, // Light text for dark mode
                        }}
                      >
                        {renderCellContent(record, col)}
                      </TableCell>
                    ))}
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      padding: '8px 16px',
                      position: 'sticky',
                      right: 0,
                      backgroundColor: darkBackground, // Dark background for sticky column
                      zIndex: 1,
                      boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
                      color: textColor, // Light text for dark mode
                    }}
                  >
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => onEdit(record)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => onDelete(record)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: '1px solid rgba(255, 255, 255, 0.12)', // Light border for dark mode
          color: textColor, // Light text for dark mode
        }}
      />
    </Paper>
  );
};

export default GenericTable;