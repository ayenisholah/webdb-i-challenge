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

function createNewAccount({ name, budget }) {
  return db('accounts').insert({ name, budget });
}

function updateAccountById(id, { name, budget }) {
  return db('accounts').where({ id }).update({ name, budget });
}

server.use(express.json());

// Endpoint here
server.get('/', (req, res, next) => {
  res.json('success!');
});

server.get('/accounts/:id', async (req, res) => {
  const records = await getAccountById(req.params.id);
  res.json(records[0]);
});

server.get('/accounts', async (req, res, next) => {
  const accounts = await getAllAccounts();
  res.json(accounts);
});

server.post('/accounts', async (req, res, next) => {
  try {
    const arrayOfIds = await createNewAccount(req.body);
    const arrayOfAccounts = await getAccountById(arrayOfIds[0]);
    res.status(201).json(arrayOfAccounts[0]);
  } catch (error) {
    next(new Error ("Couldn't create account :"));
  }
});

server.put('/accounts/:id', async (req, res, next) => {
  if(!req.body.name || !req.body.budget) {
    next(new Error('name and budget are mandatory!!!'));
  } else {
    const { name, budget } = req.body;
    const results = await updateAccountById(req.params.id, { name, budget });
    res.json(results);
  }
})

module.exports = server;