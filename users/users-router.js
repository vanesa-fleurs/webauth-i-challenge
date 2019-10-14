const router = require('express').Router();
const Users = require('./users-model.js');

router.get('/', (req,res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: `error gettign all users`})
    }
    );
})

router.post('/register', (req,res) => {
    let user = req.body;
    console.log("password from client", user.password)

    //overwrite password that user types
    user.password = bcrypt.hashSync(user.password, 10)
    console.log("password after hash & --> DB", user.password)

    Users.add(user)
        .then(store => {
            
        })
        .catch();
})

module.exports = router