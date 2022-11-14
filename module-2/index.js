const http = require('http');
const url = require('url');
const port = 5000;
const backend_url = "http://localhost:5000/?new=1&old=2";
const events = require("events");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write('<h1>Hello</h1>');
        res.end();
    }
    // const parsedUrl = url.parse(backend_url, true)
    // console.log(parsedUrl.query);

    if (req.url === "/create-events") {
        const eventsEmitter = new events.EventEmitter()
        // creating an event handler 
        const hitEvent = () => {
            console.log("event is hit...");
        }
        // assign the handler into an event
        eventsEmitter.on("stream", hitEvent).hitEvent;
        // firing the event
        eventsEmitter.emit("stream")
        res.end("Event is hit...")

    };

    // ===============create stream buffer================
    if (req.url === "/stream-buffer") {
        const readStream = fs.createReadStream("./data.txt");
        readStream.on("open", () => {
            console.log("Stream is open...");
        })
        readStream.on("data", (chunk) => {
            console.log("..................");
            console.log(chunk);
            res.end(chunk)
        })
        setTimeout(()=>{
            readStream.pause()
            console.log("Streaming is Pause");
        },1000)
        setTimeout(()=>{
            readStream.resume()
            console.log("Streaming is resume");
        },3000)
        
    };
})




server.listen(port);
console.log("Server running....")