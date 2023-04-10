const loginField = document.querySelector(".login-field");
const usernameField = document.querySelector(".username-field");
const passwordField = document.querySelector(".password-field");

const btnLogin = document.querySelector(".login-btn");
// const btnCreate = document.querySelector(".create-account-btn");

// btnLogin.addEventListener("click", () => {
//   username = usernameField.event.target.value;
//   password = passwordField.event.target.value;
// });

async function handleAuthentication() {
  const authDetails = {
    username: usernameField.value,
    password: passwordField.value,
  };

  // authenticate with server
  await authenticate(authDetails);
  refreshListContent();
}
btnLogin.addEventListener("click", handleAuthentication);
