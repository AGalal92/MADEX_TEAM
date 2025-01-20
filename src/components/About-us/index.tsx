'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import GenericTable from '@/components/GenericTable';
import GenericFormModal from '@/components/GenericFormModal';
import useCRUD from '@/hooks/useCRUD';

const About = () => {
  const storeId = 'about'; // Replace with dynamic storeId as needed
  const {
    data: abouts,
    error,
    loading,
    fetchData,
    createData,
    updateData,
    deleteData,
  } = useCRUD('http://localhost:5001/api', storeId);

  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (abouts?.length > 0) {
      // Dynamically generate columns based on keys in the first record
      const dynamicColumns = Object.keys(abouts[0]).map((key) => ({
        field: key,
        label: key.replace(/_/g, ' ').toUpperCase(),
        type: key.includes('img') ? 'image' : 'text', // Add type detection for images
      }));
      setColumns(dynamicColumns);
    }
  }, [abouts]);

  const handleOpenModal = (record = null) => {
    setCurrentRecord(record);
    setFormValues(record || {});
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async () => {
    if (currentRecord) {
      await updateData(currentRecord.id, formValues);
    } else {
      await createData(formValues);
    }
    handleCloseModal();
  };

  const handleDelete = async (record) => {
    await deleteData(record.id);
  };

  return (
    <div className="">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1>About Us</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Create New
        </Button>
      </Box>

      <GenericTable
        data={abouts}
        loading={loading}
        error={error}
        columns={columns}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <GenericFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formValues={formValues}
        setFormValues={setFormValues}
        fields={columns.map((col) => ({
          name: col.field,
          label: col.label,
          type: col.type, // Pass the type information to the modal
        }))}
        title={currentRecord ? 'Edit Record' : 'Create New Record'}
      />
    </div>
  );
};

export default About;