const newFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('#post-body').value;
  const scratch = document.querySelector('#post-scratch').value;

  await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      scratch
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);
