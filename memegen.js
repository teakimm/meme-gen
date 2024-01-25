let memeList = [];
let isEdit = false;

function constructForm(targetSelector) {
  const targetDiv = document.querySelector(".grid-item." + targetSelector);
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
  urlInput.setAttribute("autocomplete", "off");
  urlInput.setAttribute("placeholder", "Paste image adress here");
  if(isEdit) {
    urlInput.setAttribute("value", memeList[targetSelector.slice(6)].urlKey);
  }
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
  topInput.setAttribute("autocomplete", "off");
  topInput.setAttribute("placeholder", "TOP TEXT");
  if(isEdit) {
    topInput.setAttribute("value", memeList[targetSelector.slice(6)].topKey)
  }
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
  botInput.setAttribute("autocomplete", "off");
  botInput.setAttribute("placeholder", "BOTTOM TEXT");
  if(isEdit) {
    botInput.setAttribute("value", memeList[targetSelector.slice(6)].botKey)
  }
  botDiv.appendChild(botLabel);
  botDiv.appendChild(botInput);
  formEle.appendChild(botDiv);
  //create subbmission
  if(isEdit) {
    const editMeme = document.createElement("div");
    editMeme.setAttribute("class", "editMeme");
    const editSubmit = document.createElement("input");
    editSubmit.setAttribute("type", "submit");
    editSubmit.setAttribute("value", "Edit Meme");
    formEle.appendChild(editSubmit);
  } else {
    const submit = document.createElement("div");
    submit.setAttribute("class", "submit");
    const submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "Memeify!");
    submit.appendChild(submitInput);
    formEle.appendChild(submit);
  }
  //append it all
  formContainer.appendChild(formEle);
  targetDiv.appendChild(formContainer);
}


const gridContainer = document.querySelector(".grid-container");

function constructMeme(index) {
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item", "index-" + index);
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
  gridItem.appendChild(botText);
  //create the settings
  const settings = document.createElement("div");
  settings.classList.add("settings", "index-" + index);
  const edit = document.createElement("button");
  edit.classList.add("edit", "index-" + index);
  //^this will help in finding which index to get data from
  edit.textContent = "Edit";
  const remove = document.createElement("button");
  remove.classList.add("remove", "index-" + index);
  //^this will help in finding which index to remove;
  remove.textContent = "Remove";
  settings.appendChild(edit);
  settings.appendChild(remove);
  gridItem.appendChild(settings)
  //add the item to the container
  gridContainer.appendChild(gridItem);
}

/*this is the function to get the list of memes adds them to the dom
it also wipes the dom beforehand*/
function populateMemes() {
  gridContainer.replaceChildren();
  for(let i = 0; i < memeList.length; i++) {
    constructMeme(i);
  }
  //create new meme needs to be remade
  const memeMaker = document.createElement("div");
  memeMaker.classList.add("grid-item", "create");
  const makeBtn = document.createElement("button");
  makeBtn.setAttribute("class", "new-meme");
  makeBtn.textContent = "+";
  memeMaker.appendChild(makeBtn);
  gridContainer.appendChild(memeMaker);
}

//remove the meme at given idex found by the id of the button
function removeMeme(index) {
  memeList.splice(index, 1);
}

function editMeme(index) {
  isEdit = true;
  constructForm(index);
  const buttonAtIndex = document.querySelector(".settings." + index);
  buttonAtIndex.style.display = "none";
}

let form = document.querySelector(".form");

function listenClicks() {
  document.addEventListener("click", event => {
    if(event.target.className === "new-meme") {
      populateMemes();
      isEdit = false;
      const newMemeBtn = document.querySelector(".new-meme");
      newMemeBtn.style.display = "none";
      constructForm("create");
      form = document.querySelector(".form");
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
    if(event.target.classList.contains("remove")) {
      populateMemes();
      removeMeme(parseInt(event.target.classList[1].slice(6)));
      populateMemes();
    }
    if(event.target.classList.contains("edit")) {
      populateMemes();
      editMeme(event.target.classList[1]);
      form = document.querySelector(".form");
      form.addEventListener("submit",  innerEvent => {
        innerEvent.preventDefault();
        let formData = new FormData(form);
        const urlData = formData.get("url");
        const topData = formData.get("top");
        const botData = formData.get("bot");
        let currentMeme = {
          urlKey : urlData,
          topKey : topData,
          botKey : botData,
        }
        memeList[parseInt(event.target.classList[1].slice(6))] = currentMeme;
        populateMemes();
      });
    }
  });
}
listenClicks();