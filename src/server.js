const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === './styles/styles.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === './client/client.html') {
    htmlHandler.getIndex(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  handleGet(request, response, parsedUrl);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
