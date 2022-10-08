const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const authRouter = require('./src/routes/api/auth');
const userRouter = require('./src/routes/api/user');
const bookRouter = require('./src/routes/api/book');
const statisticsRouter = require('./src/routes/api/statistics');
const quoteRouter = require('./src/routes/api/quote');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/book', bookRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/quote', quoteRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
