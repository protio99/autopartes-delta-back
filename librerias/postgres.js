const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'admin123',
    database: 'autopartes_delta',
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
