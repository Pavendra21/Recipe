const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const info = require('./Routes/route');
const cookieParser = require('cookie-parser'); // Add this line
const DB = "mongodb+srv://pavendra21:psr123456@cluster1.4lk1w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";


 
// const Recipe = require('./Model/Schema');
// const Contact = require('./Model/Contact');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // This is the key part
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

 
// Connections

mongoose.connect(DB, {
     
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

const PORT = 8000;

//cookies



app.use('/', info)

app.listen(PORT, () => console.log(`Server ${PORT} started successfully`));
