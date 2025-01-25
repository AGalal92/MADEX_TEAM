'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutsTable = () => {
  const [abouts, setAbouts] = useState([]);
  const [editAbout, setEditAbout] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    img1: null,
    img2: null,
    slug1: '',
    slug2: '',
    par1: '',
    par2: '',
    list_items: [],
    link: '',
  });

  const API_BASE_URL = 'http://localhost:5001/api/abouts'; // Replace with your backend URL

  // Fetch all abouts
  const fetchAbouts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setAbouts(response.data);
    } catch (error) {
      console.error('Error fetching abouts:', error);
    }
  };

  useEffect(() => {
    fetchAbouts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug1', formData.slug1);
    data.append('slug2', formData.slug2);
    data.append('par1', formData.par1);
    data.append('par2', formData.par2);
    data.append('list_items', JSON.stringify(formData.list_items));
    data.append('link', formData.link);
    if (formData.img1) data.append('img1', formData.img1);
    if (formData.img2) data.append('img2', formData.img2);

    try {
      if (editAbout) {
        // Update existing about
        await axios.put(`${API_BASE_URL}/${editAbout.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Create new about
        await axios.post(API_BASE_URL, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchAbouts(); // Refresh the table
      setFormData({
        title: '',
        img1: null,
        img2: null,
        slug1: '',
        slug2: '',
        par1: '',
        par2: '',
        list_items: [],
        link: '',
      });
      setEditAbout(null);
    } catch (error) {
      console.error('Error saving about:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (about) => {
    setEditAbout(about);
    setFormData({
      title: about.title,
      img1: null,
      img2: null,
      slug1: about.slug1,
      slug2: about.slug2,
      par1: about.par1,
      par2: about.par2,
      list_items: about.list_items,
      link: about.link,
    });
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchAbouts(); // Refresh the table
    } catch (error) {
      console.error('Error deleting about:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Abouts Table</h1>

      {/* Form for Create/Update */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="slug1"
            placeholder="Slug 1"
            value={formData.slug1}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="slug2"
            placeholder="Slug 2"
            value={formData.slug2}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <textarea
            name="par1"
            placeholder="Paragraph 1"
            value={formData.par1}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <textarea
            name="par2"
            placeholder="Paragraph 2"
            value={formData.par2}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={formData.link}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="file"
            name="img1"
            onChange={(e) => handleImageUpload(e, 'img1')}
            className="p-2 border rounded"
          />
          <input
            type="file"
            name="img2"
            onChange={(e) => handleImageUpload(e, 'img2')}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editAbout ? 'Update' : 'Create'}
        </button>
      </form>

      {/* Table to display abouts */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Slug 1</th>
            <th className="py-2 px-4 border">Slug 2</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {abouts.map((about) => (
            <tr key={about.id}>
              <td className="py-2 px-4 border">{about.title}</td>
              <td className="py-2 px-4 border">{about.slug1}</td>
              <td className="py-2 px-4 border">{about.slug2}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleEdit(about)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(about.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AboutsTable;