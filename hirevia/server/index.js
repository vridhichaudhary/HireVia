const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Passport Config
require('./config/passport');
app.use(passport.initialize());

// Routes
app.get('/', (req, res) => {
    res.send('HireVia API is running...');
});

// Auth Routes
app.use('/api/auth', require('./routes/auth.routes'));

// Job Routes
app.use('/api/jobs', require('./routes/job.routes'));

// Application Routes
app.use('/api/applications', require('./routes/application.routes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
