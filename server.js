const express = require('express');
const helmet = require('helmet')
const bcrypt = require('bcryptjs')

const server = express();

server.use(express.json())
server.use(helmet())

const userRouter = require('./users/users-router.js')
server.use('/api/users', userRouter);

server.get('/', (req,res) => {
    res.send(`
      <h2>Lambda Web Auth I</h>
      <p>Let's get started... </p>
    `);
})

module.exports = server;
