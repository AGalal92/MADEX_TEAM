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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Image from 'next/image';

const GenericTable = ({ data = [], loading, error, columns, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderCellContent = (record, col) => {
    const cellValue = record[col.field];
    if (col.type === 'image' && cellValue) {
      return (
        <Image
          src={cellValue}
          alt={col.label}
          width={50}
          height={50}
          style={{ objectFit: 'cover', borderRadius: '4px' }}
        />
      );
    }
    return cellValue || '-';
  };

  return (
    <Paper sx={{ boxShadow: 3, borderRadius: '8px', overflowX: 'auto' }}>
      <TableContainer sx={{ minHeight: 'calc(100vh - 300px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    padding: '8px 16px', // Reduced padding
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  textAlign: 'center',
                  padding: '8px 16px', // Reduced padding
                  position: 'sticky',
                  right: 0,
                  zIndex: 2, // Higher zIndex to ensure it stays above other sticky elements
                  backdropFilter: 'blur(8px)', // Optional: Adds a blur effect to the sticky header
                  boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)', // Shadow for the sticky header
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
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : data?.length > 0 ? (
              data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record) => (
                  <TableRow key={record.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                    {columns.map((col) => (
                      <TableCell
                        key={col.field}
                        sx={{
                          whiteSpace: 'nowrap',
                          textAlign: col.type === 'image' ? 'center' : 'left',
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          padding: '8px 16px', // Reduced padding
                        }}
                      >
                        {renderCellContent(record, col)}
                      </TableCell>
                    ))}
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        padding: '8px 16px', // Reduced padding
                        position: 'sticky',
                        right: 0,
                        backgroundColor: 'white', // Match the row background color
                        zIndex: 1,
                        boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)', // Shadow for the sticky column
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
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: '1px solid #e0e0e0' }}
      />
      <style jsx global>{`
        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </Paper>
  );
};

export default GenericTable;