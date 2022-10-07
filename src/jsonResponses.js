const patterns = require('../json/patterns.json');

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getPattern = (request, response) => {
  const responseJSON = {
    patterns,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getPatternMeta = (request, response) => respondJSONMeta(request, response, 200);

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  respondJSON,
  respondJSONMeta,
  getPattern,
  getPatternMeta,
  notFound,
  notFoundMeta,
};
