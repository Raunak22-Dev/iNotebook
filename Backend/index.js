require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3004;

// Connect to MongoDB
connectToMongo();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
