const express = require('express');
const knex = require('knex');
const server = express();

// const db = require('./data/dbConfig.js');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/budget.db3',
  },
  useNullAsDefault: true,
});

// DB helper functions here
function getAllAccounts() {
  return db('accounts');
}

function getAccountById(id) {
  return db('accounts').where({ id });
}

server.use(express.json());

// Endpoint here
server.get('/', (req, res, next) => {
  res.json('success!');
});

Endpoint
server.get('/accounts/:id', async (req, res) => {
  const records = await getAccountById(req.params.id);
  res.json(records[0]);
});

server.get('/accounts', async (req, res, next) => {
  const accounts = await getAllAccounts();
  res.json(accounts);
});

module.exports = server;