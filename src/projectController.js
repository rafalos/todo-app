import Project from './project';
import { appendProject } from './DOMcontroller';

const currentProjects =
  JSON.parse(localStorage.getItem('current-projects')) || [];

let activeProject = 'default';

const addNewProject = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const projectName = formData.get('name');
  const newProject = new Project(projectName);
  appendProject(newProject);
  currentProjects.push(newProject);
  localStorage.setItem('current-projects', JSON.stringify(currentProjects));
};

const switchProject = (projectID) => {
  activeProject = projectID;
};

export { addNewProject, switchProject, currentProjects, activeProject };
