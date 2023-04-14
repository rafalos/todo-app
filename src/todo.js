import { activeProject } from './projectController';
import { v4 as uuidv4 } from 'uuid';

export default class ToDo {
  static PRIORITY_LIST = ['low', 'medium', 'high', 'critical'];
  constructor(
    title,
    description,
    dueDate,
    priority,
    project = activeProject,
    checklist = []
  ) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.checklist = checklist;
    this.done = false;
    this.archived = false;
  }

  removeChecklistItem(id) {
    const newChecklist = this.checklist.filter((check) => check.id != id);
    this.checklist = newChecklist;
  }

  addChecklistItem(description, finished = false) {
    this.checklist.push({
      id: uuidv4(),
      description,
      finished,
    });
  }

  toggleStatus() {
    this.done = !this.done;
  }

  getPriority() {
    return ToDo.PRIORITY_LIST[this.priority];
  }
}
