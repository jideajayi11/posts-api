import express from 'express';
import 'dotenv/config';
import { env } from 'process';
import cors from 'cors';
import models, { connectDb } from './models';
import routes from './routes';
import { findUserByEmail, authorizeToken } from './helper/middleware';

const port = env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb().then(async () => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});

app.use(async (req, res, next) => {
  req.context = {
    models,
    userObj: null,
  };
  next();
});

app.get('/', (req, res) => {
  res.send('hello world')
});
app.use('/users', findUserByEmail, routes.user);
app.use('/posts', authorizeToken, routes.post);
