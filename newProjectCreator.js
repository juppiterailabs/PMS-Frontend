// frontend link redirects
const baseURL = "http://localhost:5005";
const newAccountCreatorURL = "/newAccountCreator.html";
const viewAllAccountsURL = "/viewAllAccounts.html";
const dashboardURL = "/index.html";
const statusToPercent = { "in-progress": 50, "not-started": 0, completed: 100 };
let nSubtasks = 0;

const today = new Date();

const url_string = window.location.href;
var url = new URL(url_string);
const currProjectName = url.searchParams.get("project_name");
const currUserName = url.searchParams.get("user");

console.log("currPjName: ", currProjectName);

const projectTaskCommentListElem = document.querySelector(
  "#task-comments-list"
);
const subtaskTotalProgressBarElem = document.querySelector(
  "#progress-bar-container"
);
const projectCurrentStatusElem = document.querySelector(
  "#project-current-status"
);
const projectSubtaskListElem = document.querySelector("#subtask-list");
const projectNameElem = document.querySelector("#projectName");

const projectCurrentStatus = projectCurrentStatusElem.innerHTML;

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

const currentProjectStatus = function updateAllSubtaskWithGivenStatus(
  status
) {};

function changeStatus(event) {
  // update the current status.

  // update the status of all the subtasks.
  updateAllSubtaskWithGivenStatus(event.target.id);
}

// server fetch funcitons
function registerNewProject() {
  // todo: send the new Project data to backend
}

function fetchProjectInfo() {}
function fetchProjectCurrentStatus() {}
function fetchProjectSubtaskInfos() {
  // todo: fetch all the subtask for this current project.

  // NOTE: this is just the dummy data.
  const data = [
    {
      name: "Building this webapp",
      status: "in-progress",
      assignee: ["Nathan Frisk", "Jayson"],
    },
    {
      name: "this is the second subtask",
      status: "completed",
      assignee: ["Jhon Doe", "Synthia"],
    },
    {
      name: "this is the third subtask",
      status: "not-started",
      assignee: ["Jhon Doe", "Synthia"],
    },
  ];

  return data;
}

function updateProjectCurrentStatus() {
  const currentStatus = fetchProjectCurrentStatus();
  projectCurrentStatusElem.innerHTML = currentStatus;
}

function calculateTotalSubtaskProgress(subtaskInfoList) {
  nSubtasks = subtaskInfoList.length;
  let totalProgress = 0;
  for (let currSubtaskInfo of subtaskInfoList) {
    const currSubtaskStatus = currSubtaskInfo["status"];
    totalProgress += statusToPercent[currSubtaskStatus];
  }

  return totalProgress / nSubtasks;
}

function updateProjectSubtaskTotalProgress() {
  const totalSubtaskProgress = calculateTotalSubtaskProgress(
    fetchProjectSubtaskInfos()
  );

  subtaskTotalProgressBarElem.innerHTML = `
    <div
      class="w3-grey"
      style="height:24px;width:${totalSubtaskProgress}%;"
    ></div>
  `;
}

function updateProjectName() {
  projectNameElem.placeholder = currProjectName;
}

function updateProjectSubtaskInfos() {
  const subtaskInfoList = fetchProjectSubtaskInfos();

  let innerHTML = "";

  for (let currSubtaskInfo of subtaskInfoList) {
    const currSubtaskName = currSubtaskInfo["name"];
    const currSubtaskStatus = currSubtaskInfo["status"];
    const currSubtaskAssigneeList = currSubtaskInfo["assignee"];
    const currSubtaskCompletionPercent = statusToPercent[currSubtaskStatus];

    innerHTML += `
      <div id="subtask-detail-container">
        <div id="subtask-progress-bar-container">
          <div class="w3-grey" style="height:24px;width:${currSubtaskCompletionPercent}%;"></div>
        </div>
        <div id="subtask-name">
          ${currSubtaskName}
        </div>
        <div id="subtask-asignee-list">
            <div>a</div>
              <div class="w3-dropdown-hover">
                <button class="w3-button">+
                  <i class="fa fa-caret-down"></i>
                </button>

      <div class="w3-dropdown-content w3-bar-block">`;

    for (let currAssignee in currSubtaskAssigneeList) {
      innerHTML += `<a onclick="assignCurrentEmployeeToSubtask()" class="w3-bar-item w3-button">${currAssignee}</a>`;
    }

    innerHTML += `
                  </div>
                </div> 
          </div>
        </div>
      `;

    projectSubtaskListElem.innerHTML = innerHTML;
  }
}

function fetchProjectComments() {
  data = [
    {
      name: "Nathen_Frisk",
      content: "This looks great! can we also make the background red?",
      date: "Nov 1",
      time: "6:40pm",
    },
    {
      name: "Jayson",
      content: "alright! I'll incoporate that",
      date: "Nov 1",
      time: "6:45pm",
    },
  ];

  return data;
}

function generateInitials(name) {
  //const initials = name.match(
  //  /(\b[A-Z][A-Z]+|\b[A-Z]\b)/g
  //);
  const initials = name[0];

  return initials;
}

function updateProjectComments() {
  const projectCommentsList = fetchProjectComments();

  let innerHTML = `<ul>`;
  for (let currComment of projectCommentsList) {
    const currCommentDate = currComment["date"];
    const currCommentTime = currComment["time"];
    const currCommenterName = currComment["name"];
    console.log("curr", currCommenterName);
    const currCommenterInitials = generateInitials(currCommenterName);

    console.log(currCommenterInitials);
    const currCommentContent = currComment["content"];
    innerHTML += `
            <li>
              <div id="comment-container">
                <div id="comment-time" class="text">
                  ${currCommentDate} at ${currCommentTime}
                </div>
                <div id="comment-box" style="margin-top: 10px;">
      <div id="commenter-logo" class="text", style="font-size:20px">
      ${currCommenterInitials}
                  </div>
                  <div id="commenter-name" class="text" style="font-size: 13px" >
      ${currCommenterName}
                  </div>
      <div id="comment-content" style="width:200px">
      ${currCommentContent}
                  </div>
                </div>
              </div>
            </li>
    `;
  }

  innerHTML += `</ul>`;

  projectTaskCommentListElem.innerHTML = innerHTML;
}

function postNewCommentInDatabase() {
  // TODO: post new comments in database
}

function addNewComment(elem) {
  if (event.key === "Enter") {
    const commenter = currUserName;
    const commenterInitials = generateInitials(commenter);
    const content = elem.value;
    const currDate = "Nov 1";
    const currTime = "5:30pm";
    const li = document.createElement("li");

    const innerHTML = `
            <li>
              <div id="comment-container">
                <div id="comment-time" class="text">
                  ${currDate} at ${currTime}
                </div>
                <div id="comment-box" style="margin-top: 10px;">
      <div id="commenter-logo" class="text", style="font-size:20px">
      ${commenterInitials}
                  </div>
                  <div id="commenter-name" class="text" style="font-size: 13px" >
      ${commenter}
                  </div>
      <div id="comment-content" style="width:150px">
      ${content}
                  </div>
                </div>
              </div>
            </li>
    `;

    li.innerHTML = innerHTML;
    const listElem = projectTaskCommentListElem.firstChild;
    listElem.appendChild(li);

    postNewCommentInDatabase();
  }
}

function fetchCreationAndDueDate() {
  data = {
    created: "Nov 1",
    due: "Dec 8",
  };

  return data;
}
const displayCreationDateElem = document.querySelector("#displayCreationDate");
const displayDueDateElem = document.querySelector("#displayDueDate");
function updateProjectCreationAndDueDate() {
  const creationAndDueDate = fetchCreationAndDueDate();

  displayCreationDateElem.innerHTML = creationAndDueDate["created"];
  displayDueDateElem.innerHTML = creationAndDueDate["due"];
}

updateProjectName();
updateProjectSubtaskTotalProgress();
updateProjectSubtaskInfos();
updateProjectComments();
updateProjectCreationAndDueDate();
