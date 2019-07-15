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
function getAllBudgets() {
  return db('budgets');
}




server.use(express.json());

// Endpoint here
server.get('/', (req, res, next) => {
  res.json('success!');
});

module.exports = server;