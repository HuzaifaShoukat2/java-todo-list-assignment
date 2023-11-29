
const todosContainer = document.getElementById('todos');
const deleteAllButton = document.getElementById('deleteAll');
const newTodoInput = document.getElementById('newTodo');
const addTodoButton = document.getElementById('addTodo');

function updateUI() {
todosContainer.innerHTML = '';
deleteAllButton.style.display = todos.length <= 1 ? 'none' : 'block';

todos.forEach((todo, index) => {
const todoDiv = document.createElement('div');
todoDiv.className = 'todo-item';

const todoText = document.createElement('span');
todoText.innerText = todo;

const buttonsContainer = document.createElement('div');
buttonsContainer.className = 'buttons-container';

const editButton = document.createElement('button');
editButton.innerText = 'Edit';
editButton.onclick = () => editTodo(index);

const deleteButton = document.createElement('button');
deleteButton.innerText = 'Delete';
deleteButton.className = 'red';
deleteButton.onclick = () => deleteTodo(index);

buttonsContainer.appendChild(editButton);
buttonsContainer.appendChild(deleteButton);

todoDiv.appendChild(todoText);
todoDiv.appendChild(buttonsContainer);
todosContainer.appendChild(todoDiv);
});
}


function addTodo() {
  const newTodo = newTodoInput.value.trim();
  if (newTodo !== '') {
    todos.push(newTodo);
    newTodoInput.value = '';
    updateUI();
  }
}

function editTodo(index) {
  const todoDiv = todosContainer.children[index];
  const buttonsContainer = todoDiv.querySelector('.buttons-container');

  const saveButton = document.createElement('button');
  saveButton.innerText = 'Save';
  saveButton.className = 'green';
  saveButton.onclick = () => saveEdit(index);

  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.className = 'red';
  cancelButton.onclick = () => cancelEdit(index);

  buttonsContainer.innerHTML = '';
  buttonsContainer.appendChild(saveButton);
  buttonsContainer.appendChild(cancelButton);

  const todoText = todoDiv.querySelector('span');
  const currentText = todoText.innerText;

  todoText.innerHTML = '';
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = currentText;
  todoText.appendChild(editInput);
}

function saveEdit(index) {
  const todoDiv = todosContainer.children[index];
  const todoText = todoDiv.querySelector('span');
  const editInput = todoText.querySelector('input');
  const updatedText = editInput.value.trim();

  if (updatedText !== '') {
    todos[index] = updatedText;
    updateUI();
  }
}

function cancelEdit(index) {
  updateUI();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  updateUI();
}

function deleteAll() {
  todos = [];
  updateUI();
}

addTodoButton.addEventListener('click', addTodo);
deleteAllButton.addEventListener('click', deleteAll);

let todos = [];
updateUI();