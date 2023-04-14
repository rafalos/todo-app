import { addNewCheck, removeCheck, removeTodo } from './todoController';

export const attachAddNewCheck = (todoElement) => {
  todoElement.addEventListener('click', addNewCheck);
};

export const attachRemoveCheck = (todoElement) => {
  todoElement.addEventListener('click', removeCheck);
};

export const attachRemoveTodo = (removeButton) => {
  removeButton.addEventListener('click', removeTodo)
}
