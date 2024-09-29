const redis = require('redis');

const client = redis.createClient({
  url: 'redis://localhost:6379' // Adjust the URL if your Redis server is hosted elsewhere
});

client.on('error', (err) => {
  console.error('Redis client error', err);
});

client.connect();

module.exports = client;