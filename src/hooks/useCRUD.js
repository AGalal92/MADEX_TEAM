import { useState, useCallback } from 'react';
import axios from 'axios';

const useCRUD = (baseApi, storeId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = `${baseApi}/${storeId}`;

  // Fetch all records
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      console.log("🚀 ~ fetchData ~ response:", response)
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // Create a new record
  const createData = useCallback(
    async (newRecord) => {
      console.log("🚀 ~ newRecord:", newRecord)
      setLoading(true);
      try {
        const response = await axios.post(apiUrl, newRecord);
        setData((prevData) => [...(prevData || []), response.data]);
        setError(null);
      } catch (err) {
        setError(err.response?.data || 'An error occurred while creating the record');
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  // Update a record by ID
  const updateData = useCallback(
    async (id, updatedRecord) => {
      setLoading(true);
      try {
        const response = await axios.put(`${apiUrl}/${id}`, updatedRecord);
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? { ...item, ...response.data } : item))
        );
        setError(null);
      } catch (err) {
        setError(err.response?.data || 'An error occurred while updating the record');
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  // Delete a record by ID
  const deleteData = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await axios.delete(`${apiUrl}/${id}`);
        setData((prevData) => prevData.filter((item) => item.id !== id));
        setError(null);
      } catch (err) {
        setError(err.response?.data || 'An error occurred while deleting the record');
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  return {
    data,
    error,
    loading,
    fetchData,
    createData,
    updateData,
    deleteData,
  };
};

export default useCRUD;
