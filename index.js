require('./configs/dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { mongoURI, port } = require('./configs/app');
const { notFound } = require('./utils/Response.util');

// initialize app
const app = express();

// initialize body parser
app.use(bodyParser.json());

// connect to database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Database connected..."))
  .catch(err => console.error(err));

// setup routes
app.use('/auth', require("./routes/Auth"));
app.use('/seasons', require("./routes/Seasons"));
app.use('/teams', require("./routes/Teams"));
app.use('/fixtures', require("./routes/Fixtures"));

app.use((req, res) => {
  return notFound(
    res,
    'Resource has either been moved or does not exist.'
  );
});

// start server
app.listen(port, () =>  console.log(`Server started on port ${port}.`));