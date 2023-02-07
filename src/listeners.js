import {
  toggleToDoForm,
  toggleProjectForm,
  renderTodos,
  setSelectedProject
} from './DOMcontroller';
import { addNewTodo } from './todoController';
import {
  addNewProject,
  switchProject,
  activeProject,
} from './projectController';
const toggleTodoFormButton = document.querySelector('.toggle-form');
const projectList = document.getElementById('project-list');
const todoForm = document.getElementById('todo-form');
const projectForm = document.getElementById('project-form');
const toggleProjectFormButton = document.getElementById('new-project');

toggleTodoFormButton.addEventListener('click', toggleToDoForm);
toggleProjectFormButton.addEventListener('click', toggleProjectForm);
todoForm.addEventListener('submit', addNewTodo);
projectForm.addEventListener('submit', addNewProject);
projectList.addEventListener('click', (e) => {
  if (e.target.nodeName != 'LI') {
    return;
  }
  switchProject(e.target.dataset.id);
  setSelectedProject(e.target);
  renderTodos(activeProject);
});
