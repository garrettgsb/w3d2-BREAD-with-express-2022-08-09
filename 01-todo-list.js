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
