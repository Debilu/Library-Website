// Redis client initialization
import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisClient = createClient({
  url: redisUrl
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect(); // You might want to control connection timing in production
