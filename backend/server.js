const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const aboutRoutes = require('./routes/about');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
// Routes
app.use('/api/about', aboutRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});