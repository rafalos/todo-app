import { activeProject } from "./projectController";

export default class ToDo {
  static PRIORITY_LIST = ['low', 'medium', 'high', 'critical'];
  constructor(title, description, dueDate, priority, project=activeProject) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
    this.project = project;
  }

  toggleStatus() {
    this.done = !this.done;
  }

  getPriority() {
    return ToDo.PRIORITY_LIST[this.priority];
  }
}
