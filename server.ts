// src/server.ts

import express, { Request, Response } from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// YouTube API Route
app.get('/api/youtube', async (req: Request, res: Response) => {
  const { query } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        q: query,
        key: apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from YouTube' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
