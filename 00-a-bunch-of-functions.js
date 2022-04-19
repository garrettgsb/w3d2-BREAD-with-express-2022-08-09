const fs = require('fs');

function readCounter() { return Number(fs.readFileSync('./counter')); }
function writeCounter(value) { return fs.writeFileSync('./counter', value);  }

function increment() { writeCounter(readCounter() + 1); }
function decrement() { writeCounter(readCounter() - 1); }
function setTo(value) { writeCounter(Number(value)); }
function reset() { setTo(0); }


// Mapping between Javascript functions and command line interface
{
  const [_interpreter, _file, operation, value] = process.argv;
  console.log('Args:', process.argv);
  if (operation === 'increment') { increment(); console.log(`After ${operation}: ${readCounter()}`)}
  else if (operation === 'decrement') { decrement(); console.log(`After ${operation}: ${readCounter()}`)}
  else if (operation === 'set') { setTo(value); console.log(`After ${operation}: ${readCounter()}`)}
  else if (operation === 'reset') { reset(); console.log(`After ${operation}: ${readCounter()}`)}
  else { console.log(`Count is: ${readCounter()}`) }
}

//Mapping between Javascript functions and HTTP interface
{
  const express = require('express');
  const app = express();
  const PORT = 3000;

  app.get('/', (request, response) => { response.send(`
    <h1>Count is: ${readCounter()}</h1>
    <a href='/increment'>Increment</a>
    <a href='/decrement'>Decrement</a>
    <form method='GET' action='/reset'>
      <button>Reset</button>
    </form>
    <form method='GET' action='/set'>
      <input name='newCounterValue'>
      <button>Set</button>
    </form>
  `)});

  app.get('/increment', (request, response) => { increment(); response.redirect('/') });
  app.get('/decrement', (request, response) => { decrement(); response.redirect('/') });
  app.get('/reset', (request, response) => { reset(); response.redirect('https://google.com') });

  /*
    Query string params:

    http://localhost:8080/set?newCounterValue=55555&someOtherValue=hello

    ? -> Start the query string params
    newCounterValue -> The key that shows up in `request.query`
    55555 -> The value that the user (presumably) typed into the form
    & -> Separates key-value pairs

    Three places to look for your "stuff":
      * request.params -> URL params (e.g. /users/:id) - :id is the param
      * request.query -> Form data from a GET request (Query string params)
      * request.body -> Form data from a POST request

    `/users/1`
    `/users/:id`, request.params.id -> 1

    website.com/search?term=shoes
  */

  app.get('/set', (request, response) => {
    const { newCounterValue } = request.query;
    if (newCounterValue) setTo(newCounterValue);
    response.redirect('/')
  });

  app.listen(8080, () => { console.log(`Listening on ${PORT}!`)});
}
