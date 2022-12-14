const express = require('express'); // imports framework
const cors = require('cors'); // enables cross origin requests - used this to remove a cors error
const path = require('path');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();



app.use(express.json());
app.use(cors());

//setting headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', postRoutes)
app.use('/api/sauces', userRoutes);

module.exports = app;