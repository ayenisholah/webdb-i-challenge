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

server.use(express.json());

// Endpoint

module.exports = server;