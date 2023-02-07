import ToDo from './todo';
import { appendToDo } from './DOMcontroller';

const currentTodos = [];

if(localStorage.getItem('todos')) {
  const todoList = JSON.parse(localStorage.getItem('todos'));
  for (const todo of todoList) {
    currentTodos.push(new ToDo(todo.title, todo.description, todo.dueDate, todo.priority, todo.project))
  }
}

const addNewTodo = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const args = [...formData].map((x) => x[1]);
  const newTodo = new ToDo(...args);
  appendToDo(newTodo);
  currentTodos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(currentTodos));
};

export { addNewTodo, currentTodos };
