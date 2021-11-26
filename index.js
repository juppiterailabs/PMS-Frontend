// frontend link redirects
const baseURL = "http://localhost:5005";
const newAccountCreatorURL = "/newAccountCreator.html";
const viewAllAccountsURL = "/viewAllAccounts.html";
const dashboardURL = "/index.html";
const statusToPercent = { "in-progress": 50, "not-started": 0, completed: 100 };
const defaultProjectStatus = "Not started";
let nProjects = 0;

let userName = "Joseph";

const createProjectSchema = {
  name: null,
  description: null,
  start_date: null,
};

const projectContainerElem = document.querySelector(".grid-container");

function gotoRoute(route) {
  window.location.href = baseURL + route;
}

function gotoAddAccounts() {
  gotoRoute(newAccountCreatorURL);
}

function gotoViewAccounts() {
  gotoRoute(viewAllAccountsURL);
  // todo: call the backend and fetch all the accounts.
}

function gotoDashboard() {
  gotoRoute(dashboardURL);
  // todo: call the backend and fetch all the projects.
}

function gotoNewProjectCreator(projectName) {
  gotoRoute(
    "/newProjectCreator.html?project_name=" + projectName + "&user=" + userName
  );
}

function gotoProjectView(event, projectName) {
  console.log("awesome!", projectName);
  return gotoNewProjectCreator(projectName);
}

async function postNewProjectInDatabase(body) {
  const response = await fetch("http://localhost:5000/api/v1/project/create", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const content = await rawResponse.json();
}

// frontend interaction functions
function createNewProjectCell() {
  const defaultProjectName = "Project-" + nProjects;

  const getGridContainerElem = document.querySelector(".grid-container");
  const newProjectCellDiv = document.createElement("div");
  const addNewProjectBtnElem = document.querySelector("#addNewProject");
  newProjectCellDiv.className = "grid-item";
  newProjectCellDiv.id = "status-" + defaultProjectStatus;
  newProjectCellDiv.innerHTML = `
    <div id="project-status-text" >${defaultProjectStatus}</div>
    <div id="project-name-text">
      ${defaultProjectName}
    </div>
  `;

  getGridContainerElem.insertBefore(newProjectCellDiv, addNewProjectBtnElem);

  gotoNewProjectCreator(defaultProjectName);

  postNewProjectInDatabase({ name: defaultProjectName, status: defaultStatus });
}

function fetchAllProjectsNameAndStatus() {
  // todo: fetch all project name and status

  data = [
    { name: "building the application", status: "in-progress" },
    {
      name: "project 2",
      status: "not-started",
    },
    {
      name: "project 3",
      status: "completed",
    },
    {
      name: "project 4",
      status: "completed",
    },
  ];

  nProjects = data.length;
  return data;
}

function updateDashboard() {
  // create project tiles based on database.
  const allProjectsStatusAndNames = fetchAllProjectsNameAndStatus();

  let innerHTML = ``;
  for (let currProject of allProjectsStatusAndNames) {
    const currProjectName = currProject["name"];
    const currProjectStatus = currProject["status"];
    innerHTML += `
      <div onclick="gotoProjectView(event, '${currProjectName}')" id="status-${currProjectStatus}" class="grid-item">
        <div id="project-status-text">
        ${currProjectStatus}
        </div>
        <div id="project-name-text">
        ${currProjectName}
        </div>
      </div>
    `;
  }

  innerHTML += `

          <div
            onclick="createNewProjectCell()"
            id="addNewProject"
            class="grid-item"
          >
            +
          </div>
  `;

  projectContainerElem.innerHTML = innerHTML;
}

updateDashboard();
