const router = require('express').Router();
const Users = require('./users-model.js');
const bcrypt = require('bcryptjs')

// router.get('/', (req,res) => {
//     Users.get()
//     .then(users => {
//         res.status(200).json(users)
//     })
//     .catch(error => {
//         console.log(error)
//         res.status(500).json({error: `error gettign all users`})
//     }
//     );
// })

router.post('/register', (req,res) => {
    let user = req.body;
    console.log("password from client -->", user.password)
    //overwrite password that user types
    user.password = bcrypt.hashSync(user.password, 10)
    console.log("password after hash & --> DB", user.password)

    Users.add(user)
        .then(storeUser => {
            res.status(200).json(storeUser)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: `error registering new user`})
        });
})

router.post('/login', (req,res) => {
    const { username, password } = req.body

    Users.findBy({username})
        // .first() // ...
        .then(userExists => {
            //if user exists & password matches
            if(userExists && bcrypt.compareSync(password, userExists.password)){
                res.status(200).json({messsage: `Hello, ${userExists.username}`})

            }
            else{
                res.status(401).json({message: `Invalide credentials`})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: `error logging in.`})
        })
})

router.get('/', restrict, (req,res) => {
    Users.find()
        .then(allUsers => {
            res.status(200).json(allUsers)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: `error logging in.`})
        })
 
})

//Middleware
function restrict(req,res, next) {
    const { username, password } = req.headers
    if( username && password){
        Users.findBy({username})
            .then(userExists =>{
                if(userExists && bcrypt.compareSync(password, userExists.password)){
                    next();
                } 
                else{
                    res.status(401).json({message: `invalid credentials`})
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({error: `error`})
            })
    } 
    else{
        res.status(401).json({message: `provide username & password`})
    }
}

module.exports = router