const router = require('express').Router();
const Users = require('./users-model.js');
const bcrypt = require('bcryptjs')
const restricted = require('../auth/restricted-middleware.js')
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
    const hash = bcrypt.hashSync(user.password, 10) 
    user.password = hash;
    console.log("password after hash & --> DB", hash)

    Users.add(user)
        .then(storeUser => {
            //add the uer to the session. Now meta-info. about the user is attatched
            //to the session! 
            // req.session.user = saved;...
            res.status(201).json(storeUser)
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
                //add the uer to the session. Now meta-info. about the user is attatched
                //to the session! 
                req.session.username = userExists.username;
                //cookie is automatically sent back! 
                res.status(200).json({messsage: `Hello, ${userExists.username}, Logged In.`})

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

router.get('/', restricted, (req,res) => {
    console.log('username in GET /', req.session.username);
    Users.find()
        .then(allUsers => {
            res.status(200).json(allUsers)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: `error logging in. You shall not pass!`})
        })
 
})

//Middleware
// function restrict(req,res, next) {
//     const { username, password } = req.headers
//     if( username && password){
//         Users.findBy({username})
//             .then(userExists =>{
//                 if(userExists && bcrypt.compareSync(password, userExists.password)){
//                     next();
//                 } 
//                 else{
//                     res.status(401).json({message: `invalid credentials`})
//                 }
//             })
//             .catch(error => {
//                 console.log(error)
//                 res.status(500).json({error: `error`})
//             })
//     } 
//     else{
//         res.status(401).json({message: `provide username & password`})
//     }
// }

function restrict(req,res,next) {
    
}
module.exports = router