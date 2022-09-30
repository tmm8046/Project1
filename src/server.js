const http = require("http");

const htmlHandler = require("./htmlResponses");
const jsonHandler = require("./jsonResponses");

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on port: ${port}`)
});