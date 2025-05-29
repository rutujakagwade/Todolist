const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorMiddleware');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5001;

// Connect DB
connectDB();

// CORS Middleware
app.use(cors({
  origin: ['https://todolist-liart-iota-60.vercel.app'],
  credentials: true
}));
app.options('*', cors());

// Body Parser
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
