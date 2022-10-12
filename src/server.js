const http = require('http');
const url = require('url');

const query = require('querystring');

const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/styles.css': htmlHandler.getCSS,
    '/getPatterns': jsonHandler.getPattern,
    '/getPlayerStats': jsonHandler.getPlayerStats,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getPatterns': jsonHandler.getPatternMeta,
    notFound: jsonHandler.notFoundMeta,
  },
  POST: {
    '/sendPlayerStats': jsonHandler.sendPlayerStats,
    notFound: jsonHandler.notFound,
  },
};

const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    handler(request, response, bodyParams);
  });
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response);
  }
  if (urlStruct[request.method][parsedUrl.pathname] && parsedUrl.pathname === '/sendPlayerStats') {
    parseBody(request, response, jsonHandler.sendPlayerStats);
    return urlStruct[request.method][parsedUrl.pathname](request, response);
  }
  return urlStruct[request.method].notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
