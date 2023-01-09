
const signupFormHandler = async function(event) {
  event.preventDefault();

  const accountNameEl = document.querySelector("#account-input-signup");
  const passwordEl = document.querySelector("#password-input-signup");
  fetch("/api/account", {
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
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
