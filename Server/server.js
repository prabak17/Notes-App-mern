// Web server
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const cors = require('cors');

const app = express();

const corsOptions ={
    origin:'*', 
    credentials:true, //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

dotenv.config();
connectDB();

// For accepting json data from user
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/notes', noteRoutes);

app.get("/",(req, res) => {
    res.send("Backend is running...");
});

const PORT = process.env.PORT || 5320;

app.listen(PORT, console.log(`Server started on port ${PORT}`));