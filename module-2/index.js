const http = require('http');
const port = 8000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Server is running.....");
        res.end();
    }
})

server.listen(port);
console.log("Server running....")