const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const next = require('next');

// Import routes
const authRoutes = require('./routes/auth');
const aboutRoutes = require('./routes/aboutRoutes');
const workCategoryRoutes = require('./routes/workCategoryRoutes');
const workRoutes = require('./routes/workRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes');
const teamRoutes = require('./routes/teamRoutes');
const mongoose = require('./db');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Initialize Express app
const app = express();
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to match your frontend URL
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/storage', express.static(path.join(__dirname, 'storage'))); 
app.use('/api/abouts', aboutRoutes); 
app.use('/api/work-categories', workCategoryRoutes);
app.use('/api/works', workRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact-us', contactUsRoutes);
app.use('/api/team', teamRoutes);

// Handle Next.js frontend
nextApp.prepare().then(() => {
  // Fallback for frontend routes
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
