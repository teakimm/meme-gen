const form = document.querySelector(".form");
let formData;

form.addEventListener("submit", event => {
  event.preventDefault();
  formData = new FormData(form);
  const url = formData.get("url");
  const top = formData.get("top");
  const bot = formData.get("bot");
  makeMeme(url, top, bot);
});

function makeMeme(url, top, bot) {
  console.log(top);
}

