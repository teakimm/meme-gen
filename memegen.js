const newMemeBtn = document.querySelector(".new-meme");

let formData;

function makeForm() {
  const create = document.querySelector(".create");
  const formContainer = document.createElement("div");
  formContainer.setAttribute("class", "form-container");
  const formEle = document.createElement("form");
  formEle.setAttribute("class", "form");
  //create url section
  const urlDiv = document.createElement("div");
  const urlLabel = document.createElement("label");
  urlLabel.setAttribute("for", "url");
  urlLabel.textContent = "Image URL:";
  const urlInput = document.createElement("input");
  urlInput.setAttribute("id", "url");
  urlInput.setAttribute("type", "url")
  urlInput.setAttribute("name", "url");
  urlInput.setAttribute("required", "true");
  urlInput.setAttribute("placeholder", "Paste image adress here");
  urlDiv.appendChild(urlLabel);
  urlDiv.appendChild(urlInput);
  formEle.appendChild(urlDiv);
  //create top text section
  const topDiv = document.createElement("div");
  const topLabel = document.createElement("label");
  topLabel.setAttribute("for", "top");
  topLabel.textContent = "Top Text:";
  const topInput = document.createElement("input");
  topInput.setAttribute("id", "top");
  topInput.setAttribute("name", "top");
  topInput.setAttribute("placeholder", "TOP TEXT");
  topDiv.appendChild(topLabel);
  topDiv.appendChild(topInput);
  formEle.appendChild(topDiv);
  //create bottom text section
  const botDiv = document.createElement("div");
  const botLabel = document.createElement("label");
  botLabel.setAttribute("for", "bot");
  botLabel.textContent = "Bottom Text:";
  const botInput = document.createElement("input");
  botInput.setAttribute("id", "bot");
  botInput.setAttribute("name", "bot");
  botInput.setAttribute("placeholder", "BOTTOM TEXT");
  botDiv.appendChild(botLabel);
  botDiv.appendChild(botInput);
  formEle.appendChild(botDiv);
  //create subbmission
  const submit = document.createElement("div");
  submit.setAttribute("class", "submit");
  const submitInput = document.createElement("input");
  submitInput.setAttribute("type", "submit");
  submitInput.setAttribute("value", "Memeify!");
  submit.appendChild(submitInput);
  //append it all
  formEle.appendChild(submit);
  formContainer.appendChild(formEle);
  create.appendChild(formContainer);
}

newMemeBtn.addEventListener("click", event => {
  newMemeBtn.style.display = "none";
  makeForm();
  const form = document.querySelector(".form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    formData = new FormData(form);
    const urlData = formData.get("url");
    const topData = formData.get("top");
    const botData = formData.get("bot");
    form.reset();
    makeMeme(urlData, topData, botData);
  });
});

function makeMeme() {
  console.log(formData);
}