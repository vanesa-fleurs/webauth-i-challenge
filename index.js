const server = require('./server.js')

const port = 8888

server.listen(port, () => {
    console.log(`listening on port: ${port}`)
})