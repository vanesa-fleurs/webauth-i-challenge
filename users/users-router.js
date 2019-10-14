const router = require('express').Router();
const Users = require('./users-model.js');

router.get('/', (req,res) => {
    Users.get()
    .then(users => {
        res.status(200).json(newProjects)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: `error gettign all users`})
    }
    );
})


module.exports = router