import { currentTodos } from './todoController';
import { currentProjects } from './projectController';
import { attachAddNewCheck, attachRemoveCheck, attachRemoveTodo } from './dynamicListeners';

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
  const checklistElement = createElement(
    'div',
    rootElement,
    'todo-item__checklist'
  );
  const checklistControl = createElement('div', checklistElement, 'checklist-control')
  const checkListInput = createElement('input', checklistControl);
  const checklistButton = createElement(
    'i',
    checklistControl,
    'fa-solid',
    'fa-plus'
  );
  const checklistList = createElement('ul', checklistElement);
  const dateElement = createElement('div', rootElement);
  const controlElement = createElement('div', rootElement);
  const doneButton = createElement(
    'i',
    controlElement,
    'fa-solid',
    'fa-square-check'
  );
  const removeButton = createElement(
    'i',
    controlElement,
    'fa-solid',
    'fa-trash'
  );

  attachRemoveTodo(removeButton);
  attachAddNewCheck(checklistButton);
  attachRemoveCheck(checklistElement)
  renderChecklist(todo.checklist, checklistList);
  checkListInput.placeholder = "Input checklist item"
  checklistList.id = 'checklist';
  dateElement.textContent = todo.dueDate;
  descriptionElement.textContent = todo.description;
  headerElement.textContent = todo.title;
  rootElement.dataset.id = todo.id;
};

const renderTodos = (projectID = 'default') => {
  todoList.innerHTML = '';
  const filteredTodos = currentTodos.filter((x) => x.project == projectID);
  filteredTodos.forEach((todo) => {
    appendToDo(todo);
  });
};

const renderChecklist = (checklistItems, listElement, inputElement = null) => {
  if(inputElement) {
    inputElement.value = ''
  }
  listElement.innerHTML = '';
  for (const checklistItem of checklistItems) {
    const element = createElement('li', listElement, 'check-item');
    element.dataset.id = checklistItem.id
    element.textContent = checklistItem.description;
  }
};

const setSelectedProject = (selectedProjectElement) => {
  const projectListItems = document.querySelectorAll('.project');
  projectListItems.forEach((item) => {
    item.classList.remove('active');
  });
  selectedProjectElement.classList.add('active');
};

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
  renderChecklist,
  toggleToDoForm,
  toggleProjectForm,
  appendToDo,
  appendProject,
  renderTodos,
  renderProjects,
  setSelectedProject,
};
