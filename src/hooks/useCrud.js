import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Base URL for your API

export const useCrud = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/${endpoint}`);
      setData(response.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Create data
  const createData = async (newData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, newData);
      fetchData(); // Refresh the data after creation
      return response.data;
    } catch (err) {
      throw err.response?.data || 'Error creating data';
    }
  };

  // Update data
  const updateData = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, updatedData);
      fetchData(); // Refresh the data after update
      return response.data;
    } catch (err) {
      throw err.response?.data || 'Error updating data';
    }
  };

  // Delete data
  const deleteData = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
      fetchData(); // Refresh the data after deletion
    } catch (err) {
      throw err.response?.data || 'Error deleting data';
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, createData, updateData, deleteData, fetchData };
};
