import ToDo from './todo';
import { appendToDo, renderChecklist, renderTodos } from './DOMcontroller';

let currentTodos = [];

if (localStorage.getItem('todos')) {
  const todoList = JSON.parse(localStorage.getItem('todos'));
  for (const todo of todoList) {
    currentTodos.push(
      new ToDo(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.priority,
        todo.project,
        todo.checklist
      )
    );
  }
}

const addNewTodo = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const args = [...formData].map((x) => x[1]);
  const newTodo = new ToDo(...args);
  appendToDo(newTodo);
  currentTodos.push(newTodo);
  storeTodos();
};

const removeTodo = (e) => {
  const todoID = e.target.closest('.todo-item').dataset.id;
  const newTodos = currentTodos.filter((todo) => todo.id != todoID);

  currentTodos = [...newTodos];
  renderTodos()
  storeTodos()
};

const addNewCheck = (e) => {
  const checkListElement = e.target
    .closest('.todo-item')
    .querySelector('#checklist');
  const inputElement = e.target.previousSibling;
  const description = inputElement.value;
  if (description === '') {
    return;
  }
  const todoID = e.target.closest('.todo-item').dataset.id;
  const todo = currentTodos.find((x) => x.id === todoID);

  todo.addChecklistItem(description);
  renderChecklist(todo.checklist, checkListElement, inputElement);
  storeTodos();
};

const removeCheck = (e) => {
  const checkListElement = e.target
    .closest('.todo-item')
    .querySelector('#checklist');
  if (e.target.tagName !== 'LI') {
    return;
  }
  const todoID = e.target.closest('.todo-item').dataset.id;
  const todo = currentTodos.find((x) => x.id === todoID);
  todo.removeChecklistItem(e.target.dataset.id);
  renderChecklist(todo.checklist, checkListElement);
};

const storeTodos = () => {
  localStorage.setItem('todos', JSON.stringify(currentTodos));
};

export { addNewTodo, currentTodos, addNewCheck, removeCheck, removeTodo };
