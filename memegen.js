let memeList = [];

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


const gridContainer = document.querySelector(".grid-container");

function constructMeme(index) {
  const bot = memeList[index].botKey;
  const gridItem = document.createElement("div");
  gridItem.setAttribute("class", "grid-item");
  //create an element for the image
  const memeImage = document.createElement("img");
  memeImage.setAttribute("src", memeList[index].urlKey);
  memeImage.setAttribute("alt", "This is your meme.");
  gridItem.appendChild(memeImage);
  //create the top text
  const topText = document.createElement("h2");
  topText.setAttribute("class", "top-text");
  topText.textContent = memeList[index].topKey;
  gridItem.appendChild(topText);
  //create the bot text
  const botText = document.createElement("h2");
  botText.setAttribute("class", "bot-text");
  botText.textContent = memeList[index].botKey;
  //create the settings
  const settings = document.createElement




  gridItem.appendChild(botText);
  gridContainer.appendChild(gridItem);
}

//this is the function to get the list of memes adds them to the dom
function populateMemes() {
  gridContainer.replaceChildren();
  for(let i = 0; i < memeList.length; i++) {
    constructMeme(i);
  }
  //create new meme needs to be remade
  const createMeme = document.createElement("div");
  createMeme.classList.add("grid-item", "create");
  const makeBtn = document.createElement("button");
  makeBtn.setAttribute("class", "new-meme");
  makeBtn.textContent = "New Meme";
  createMeme.appendChild(makeBtn);
  gridContainer.appendChild(createMeme);
}

/*the dom only needs to be updated when a new meme is made, and this is the logic
to get the data from the form */
function appendMemes() {
  const newMemeBtn = document.querySelector(".new-meme");
  newMemeBtn.style.display = "none";
  makeForm();
  const form = document.querySelector(".form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    let formData = new FormData(form);
    const urlData = formData.get("url");
    const topData = formData.get("top");
    const botData = formData.get("bot");
    let currentMeme = {
      urlKey : urlData,
      topKey : topData,
      botKey : botData,
    }
    memeList.push(currentMeme);
    populateMemes();
  });
}
function listenClicks() {
  document.addEventListener("click", event => {
    if(event.target.className === "new-meme") {
      appendMemes();
    }
  });
}
listenClicks();