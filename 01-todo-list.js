/*
What's a Resource?

Examples:

* Products
* Articles
* Tweets
* Users
* Admins
* Todos
* Playlists
* Songs
* Classifieds

Resources can be thought of as just "Users" or "Posts", with different variations.

What's a BREAD action?

CRUD - Create, Read, Update, Delete
  * CRUD sounds gross
  * CRUD doesn't have the "B"

B - Browse - Look at a whole collection
R - Read - Look at a specific entry in a collection
E - Edit
A - Add
D - Delete

*/

let todos = [
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
    <li>
    ${todo} [${idx}]
      <form method='POST' action='/todos/${idx}'>
        <input name='newText'>
        <button>Edit</button>
      </form>
      <form method='POST' action='/todos/${idx}/delete'>
        <button>🚮</button>
      </form>
    </li>
  `).join('\n')}
  </ul>

  <form method='POST' action='/todos'>
    <input name='todo'>
    <button>+ Add</button>
  </form>
  `;
}

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// Browse todos
app.get('/todos', (_request, response) => {
  response.send(viewTodos());
});

// Read todos - NOT TODAY

// Edit todos
app.post('/todos/:id', (request, response) => {
  const id = request.params.id;
  const newText = request.body.newText;
  console.log('Body:', request.body);
  updateTodo(id, newText);
  response.redirect('/todos');
});

// Add todo
app.post('/todos', (request, response) => {
  const todo = request.body.todo;
  addTodo(todo);
  response.redirect('/todos');
});

// Delete todo
app.post('/todos/:id/delete', (request, response) => {
  const idx = request.params.id;
  removeTodo(idx);
  response.redirect('/todos');
});

app.listen(PORT, () => { console.log('Server!') });
