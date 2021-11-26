const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const baseURL = "http://localhost:5005";
const dashboardURL = "/index.html";

function gotoRoute(route) {
  window.location.href = baseURL + route;
}

function gotoDashboard() {
  gotoRoute(dashboardURL);
  // todo: call the backend and fetch all the projects.
}

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  console.log("username", username, "password", password);

  if (username === "joseph" && password === "mypassword") {
    alert("You have successfully logged in.");
    gotoDashboard();
  } else {
    alert("login Failed Please Retry.");
  }
});
