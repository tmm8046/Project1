const patterns = require("../json/patterns.json");

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const getPattern = (request, response) => {
  const responseJSON = {
    patterns,
  }

  return respondJSON(request, response, 200, responseJSON);
}

module.exports = {
  respondJSON,
  getPattern
};
