const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log(req.body);


  if (req.body) {
  let time = new Date().getTime();
  let error_id = uuidv4();
  let errors_tip = req.body.errors.tip;
  let errors_topic = req.body.errors.topic;
  let errors_username = req.body.errors.username;

  const newDiagnostic = {
    time,
    error_id,
    errors_tip,
    errors_topic,
    errors_username
  };

  readAndAppend(newDiagnostic, './db/diagnostics.json');
  res.json(`Diagnostic added successfully 🚀`);
  } else {
    res.error('Error in adding diagnostic');
  }

});

module.exports = diagnostics;

