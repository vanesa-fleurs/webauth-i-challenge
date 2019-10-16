db = require('../data/db.js')

module.exports = {
    get,
    getById,
    add,
    findBy,
    find
}

function get(){
    return db('users');
}

function getById(id){
    return get().where({id}).first();
}

function add(user){
    return db('users')
    .insert(user, 'id')
    .then(([id]) => getById(id))
}

function findBy(filter) {
    return db('users').where(filter).first()
}

function find() {
    return db('users').select('id', 'username', 'password');
  }