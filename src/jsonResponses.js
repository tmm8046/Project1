// let localStorage = require('node-localstorage').LocalStorage;
const patterns = require('../json/patterns.json');

// localStorage = new LocalStorage('./scratch');

const playerStats = {};

// Handles JSON responses
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

// Retrieves Pattern from JSON file
const getPattern = (request, response) => {
  const responseJSON = {
    patterns,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getPatternMeta = (request, response) => respondJSONMeta(request, response, 200);

// Not found
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

// Retrieves player stats from server
const getPlayerStats = (request, response) => {
  // playerStats = localStorage.getItem('playerStats');
  const responseJSON = {
    playerStats,
  };

  respondJSON(request, response, 200, responseJSON);
};

// Sends player stats to server
const sendPlayerStats = (request, response, body) => {
  const responseJSON = {
    message: 'None.',
  };

  if (!body.score || !body.played) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  const responseCode = 204;

  // playerStats[body.score].score = score;
  // playerStats[body.played].played = played;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  // localStorage.setItem('playerStats', playerStats);
  return respondJSONMeta(request, response, responseCode);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  respondJSON,
  respondJSONMeta,
  getPattern,
  getPatternMeta,
  getPlayerStats,
  sendPlayerStats,
  notFound,
  notFoundMeta,
};
