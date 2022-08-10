/*

CRUD - Create, Read, Update, Delete
BREAD - Browse, Read, Edit, Add, Delete

Browse - Look at the collection
Read - Look at the entity
Edit - Modify an entity
Add - Modify a collection
Delete - Remove an entity

Browse
  GET '/todos'

Read (by ID)
  GET '/todos/6' <- Integer ID
  GET '/todos/f5a4f35e-eb30-4d4d-ba8e-adcf52d6d72e' <-- That's a UUID
  GET '/todos/sunday-groceries' <- Semantic ("name") ID
  GET '/todos/:id' <- Express syntax for ":id is a variable"

Edit
  POST '/todos/:id'

Add
  POST '/todos'

Delete
  POST '/todos/:id/delete'
  DELETE '/todos/:id'

Other
  Maybe you wanna have specific pages for performing edit/add
    GET '/todos/new'
    GET '/todos/:id/edit'
*/

const todos = [
  "Get milk",
  "Wash car",
  "Walk dog",
];

function addTodo(todo) {
  todos.push(todo);
}

function removeTodo(idx) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos.splice(idx, 1);
}

function updateTodo(idx, newText) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos[idx] = newText;
}

function viewTodos() {
  return `<h1>Todos:</h1>
  <ul>
  ${todos.map((todo, idx) => `
    <li style='display: flex'>
      <a href='/todos/${idx}'>${todo} [${idx}]</a>
      <form method='POST' action='/todos/${idx}'>
        <input name='newText'>
        <button>✏️</button>
      </form>
      <form method='POST' action='/todos/${idx}/delete'>
        <button>🚮</button>
      </form>
    </li>
  `).join('\n')}
  </ul>
  <form method='POST' action='/todos'>
    <input name='newText' placeholder='Add a new todo...'>
    <button>✚</button>
  </form>
  `;
}

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Home
app.get('/', (request, response) => { response.redirect('/todos') });

// Browse
app.get('/todos', (request, response) => { response.send(viewTodos()) });

// Read
app.get('/todos/:index', (request, response) => {
  const index = request.params.index;
  const todo = todos[index];
  response.send(`<p>${todo}</p><p><a href='/todos'>Back</a></p>`);
});

// Edit
app.post('/todos/:index', (request, response) => {
  const index = request.params.index;
  updateTodo(index, request.body.newText);
  response.redirect('/todos');
});

// Add
app.post('/todos', (request, response) => {
  addTodo(request.body.newText);
  response.redirect('/todos');
});

// Delete
app.post('/todos/:index/delete', (request, response) => {
  const index = request.params.index;
  removeTodo(index);
  response.redirect('/todos');
});


app.listen(8080, () => { console.log('Listening on 8080!') });
