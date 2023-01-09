const loginFormHandler = async function(event) {
  event.preventDefault();

  const accountNameEl = document.querySelector("#account-input-login");
  const passwordEl = document.querySelector("#password-input-login");
  fetch("/api/account/login", {
    method: "post",
    body: JSON.stringify({
      account_name: accountNameEl.value,
      password: passwordEl.value
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(function() {
      document.location.replace("/dashboard");
    })
    .catch(err => console.log(err));
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
