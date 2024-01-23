const form = document.querySelector(".form");
let formData;

form.addEventListener("submit", event => {
  event.preventDefault();
  formData = new FormData(form);
  const url = formData.get("url");
  const top = formData.get("top");
  const bottom = formData.get("bottom");
  form.reset();
  makeMeme(url, top, bottom);
});

function makeMeme(url, top, bottom) {
  console.log(url + " " + top + " " + bottom);
}

