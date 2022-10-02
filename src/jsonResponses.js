const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

module.exports = {
  respondJSON,
};
