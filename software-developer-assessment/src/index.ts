import express from 'express';
import dotenv from 'dotenv';
import commentRoutes from './comment.routes';
import { API_PREFIX } from './comment';
import http from 'http';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(`${API_PREFIX}comment`, commentRoutes);

export let server: http.Server;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () =>
    console.log(`production server is listening on port ${port}`),
  );
}
