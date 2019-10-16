const express = require('express');
const helmet = require('helmet')
const sessions = require('express-session')
// const knexSessionStore = require('connect-session-knex')(sessions)
const knexConfig = require('./data/db.js')

const server = express();


const sessionConfig = {
    name: 'node life',
    secret: 'lalal', //shouldn't be hardcoded in
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true, // the browser can't access via JS. always true
        secure: false,
    },
    resave: false, //so expried sessions can't be re-saved 
    saveUninitialized: false, //due to law
//     store: new knexSessionStore({
//         knex: knexConfig, 
//         //weather you wnat to create a table for the sessions or not:
//         //auto create sessions table in the database
//         tablename: 'sessions',
//         createtable: true,
//         //clear interval for createtable
//         clearInterval: 1000 * 60 * 60 //dleete expired sessions every 30 min. 

//   })
}

server.use(express.json());
server.use(helmet());
server.use(sessions(sessionConfig));


const userRouter = require('./users/users-router.js')
server.use('/api', userRouter);

server.get('/', (req,res) => {
    res.send(`
      <h2>Lambda Web Auth I</h>
      <p>Let's get started... </p>
    `);
})

module.exports = server;
