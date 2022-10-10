const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/styles.css': htmlHandler.getCSS,
    '/getPatterns': jsonHandler.getPattern,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getPatterns': jsonHandler.getPatternMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

// const handleGet = (request, response, parsedUrl) => {
//   if (parsedUrl.pathname === '/styles/styles.css') {
//     htmlHandler.getCSS(request, response);
//   } else {
//     htmlHandler.getIndex(request, response);
//   }
// };

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  // handleGet(request, response, parsedUrl);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response);
  }
  return urlStruct[request.method].notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
