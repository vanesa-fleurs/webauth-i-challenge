db = require('../data/db.js')

module.exports = {
    get,
    getById,
    add,
}

function get(){
    return db('users');
}

function getById(){
    return get().where({id}).first();
}

function add(user){
    return db('users')
    .insert(user, 'id')
    .then(([id]) => getById(id))
}