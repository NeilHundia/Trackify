const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const pool = require("./config/db")
const app = express();
const port = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Explicitly allow the Vite dev server
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Handle preflight requests
app.options('*', cors());

//Express built in parser
app.use(express.json());
app.use("/api/", require("./routes/dummyRouter"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong',
    message: err.message
  });
});

app.listen(port, async ()=>{
    console.log(`Server listening at port ${port}`);
})  