require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB = require('./config/db');
const membershipRoutes = require('./routes/membershipRoutes');
const cronJob = require('./services/cronService');

const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use('/api', membershipRoutes);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
    

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        cronJob.start();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();