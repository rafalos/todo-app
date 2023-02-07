import { currentTodos } from './todoController';
import { currentProjects } from './projectController';

const todoList = document.getElementById('todo-list');
const projectList = document.getElementById('project-list');
const todoForm = document.getElementById('todo-form');
const projectForm = document.getElementById('project-form');

const toggleToDoForm = () => {
  todoForm.classList.toggle('hidden');
};

const toggleProjectForm = () => {
  projectForm.classList.toggle('hidden');
};

const appendProject = (project) => {
  const projectElement = createElement('li', projectList, 'project');
  projectElement.textContent = project.name;
  projectElement.dataset.id = project.id;
};

const appendToDo = (todo) => {
  const rootElement = createElement(
    'div',
    todoList,
    'todo-item',
    `${todo.getPriority()}`
  );
  const headerElement = createElement('h2', rootElement);
  const descriptionElement = createElement('p', rootElement);
  const dateElement = createElement('div', rootElement);

  dateElement.textContent = todo.dueDate;
  descriptionElement.textContent = todo.description;
  headerElement.textContent = todo.title;
};

const renderTodos = (projectID = 'default') => {
  console.log(projectID)
  todoList.innerHTML = '';
  const filteredTodos = currentTodos.filter(x => x.project == projectID)
  console.log(currentTodos)
  filteredTodos.forEach((todo) => {
    appendToDo(todo);
  });
};

const setSelectedProject = (selectedProjectElement) => {
  const projectListItems = document.querySelectorAll('.project');
  projectListItems.forEach((item) => {
    item.classList.remove('active')
  })
  selectedProjectElement.classList.add('active');
}

const renderProjects = () => {
  currentProjects.forEach((project) => appendProject(project));
};

const createElement = (tag, parent, ...classes) => {
  const newElement = document.createElement(tag);
  newElement.classList = classes.join(' ');

  parent.append(newElement);
  return newElement;
};

export {
  toggleToDoForm,
  toggleProjectForm,
  appendToDo,
  appendProject,
  renderTodos,
  renderProjects,
  setSelectedProject
};
