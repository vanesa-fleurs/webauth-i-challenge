const server = require('./server.js')

const port = 4499

server.listen(port, () => {
    console.log(`listening on port: ${port}`)
})