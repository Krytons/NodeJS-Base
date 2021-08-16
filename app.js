var express = require('express');
const debug = require('debug')('app');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');
const { HOST, DB_NAME } = require('./config/env');

debug('Start');

//Database connection, using mongoose
const host = HOST;
const dbName = DB_NAME;
debug('Connecting to MongoDB database');
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${host}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
    debug('Connection error!');
});
db.once('open', () => {
    debug('DB connection Ready');
});

//Init express application
const app = express();

// Enable CORS
app.use(cors());

// Setup logger and body parser
app.use(morgan('dev'));
//Using express version > 4.16.0
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Setup routes
app.use(routes);

// Solve 304 problem
app.disable('etag');

// Handle 404 errors
app.use(function (req, res, next) {
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

module.exports = app;