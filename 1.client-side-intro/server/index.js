const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;

app.use(express.json()); // middleware to parse json body
app.use(cors()); // middleware to enable cors

let todos = [
  'Buy milk',
  'Buy eggs',
  'Buy bread'
];

app.post('/', (req, res) => {
  res.status(200).send('Thank you for your POST request');
});

app.get('/todos', (req, res) => { // create an endpoint which returns all customers as json object
  res.json(todos);
});

app.post('/todos/delete', (req, res) => { 
  const todo = req.body?.itemName;

  if (!todo) {
      return res.sendStatus(400);
  }

  todos = todos.filter(x => x !== todo);

  res.json(todos);
});

app.get('/200', (req, res) => {
  res.status(200).send('OK');
});

app.get('/201', (req, res) => {
  res.status(201).send('Created');
});

app.get('/204', (req, res) => {
  res.status(204).send('');
});

app.get('/400', (req, res) => {
  res.status(400).send('Bad Request');
});

app.get('/401', (req, res) => {
  res.status(401).send('Unauthorized');
});

app.get('/403', (req, res) => {
  res.status(403).send('Forbidden');
});

app.get('/404', (req, res) => {
  res.status(404).send('Not Found');
});

app.get('/500', (req, res) => {
  res.status(500).send('Internal Server Error');
});

app.get('/503', (req, res) => {
  res.status(503).send('Service Unavailable');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});