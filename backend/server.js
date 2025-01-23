const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const aboutRoutes = require('./routes/aboutRoutes');
const workCategoryRoutes = require('./routes/workCategoryRoutes');
const workRoutes = require('./routes/workRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/storage', express.static('storage')); 
app.use('/api/abouts', aboutRoutes); 
app.use('/api/work-categories', workCategoryRoutes);
app.use('/api/works', workRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});