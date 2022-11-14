const http = require('http');
const url = require('url');
const port = 5000;
const backend_url = "http://localhost:5000/?new=1&old=2"

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write('<h1>Hello</h1>');
        res.end();
    }
    // const parsedUrl = url.parse(backend_url, true)
    // console.log(parsedUrl.query);
})

server.listen(port);
console.log("Server running....")