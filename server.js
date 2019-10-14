const express = require('express');
const helmet = require('helmet')
const server = express();

server.use(express.json())
server.use(helmet())

const userRouter = require('./users/users-router.js')
server.use('/users', userRouter);

server.get('/', (req,res) => {
    res.send(`
      <h2>Lambda Web Auth I</h>
      <p>Let's get started... </p>
    `);
})

module.exports = server;
