const hotDogsDataName = 'hotDogsData';
const initData = ['HOT DOG - usual', 'HOT DOG - super', 'HOT DOG - hunting'];
// Check the "value" of the "input" field
function submit(e) {
  e.preventDefault();
  let input = document.querySelector('input');
  if (input.value != '')
    addHotDog(input.value, true);
    input.value = '';
}

function init() {
  // set data in local storage
  if (localStorage[hotDogsDataName] == undefined) {
    setAllData(initData);
  }

  // fill hot dogs list
  const hotDogsData = getAllData();
  for (let i = 0; i < hotDogsData.length; i++) {
    addHotDog(hotDogsData[i], false);
  }
}

init();

// load every event in the page
loadEvents();
function loadEvents() {
  document.querySelector('form').addEventListener('submit', submit);
  document.getElementById('clear').addEventListener('click', clearList);
  // recently added
  document.querySelector('.menu').addEventListener('click', deleteOrEdit);
}

// Check the condition and, depending on it, delete or edit the value of the field
function deleteOrEdit(e) {
  const className = e.target.className;
  if (className.indexOf("delete") != -1) {
    deleteHotDog(e);
  } else if (className.indexOf("edit") != -1) {
    onEdit(e)
  }
}

// Create a new field
function addHotDog(hotDogName, writeToDatabase) {
  let ul = document.querySelector('.menu');
  let li = document.createElement('li');
  li.innerHTML = `<button type="button" class="delete btn">×</button>
                  <label class="labelMenu">${hotDogName}</label>
                  <input type="text" class="formControl">
                  <button type="button" class="btn edit">Edit</button>`;
  // and put it at the end of the list
  ul.appendChild(li);
  document.querySelector('.tasksBoard').style.display = 'block';

  if (writeToDatabase) {
    createItem(hotDogName);
  }
}

// Edit field "values"
function onEdit(e) {
  let listItem = e.target.parentNode;
  const editInput = listItem.querySelector(".formControl");
  const label = listItem.querySelector("label");
  let containsClass = listItem.classList.contains("editMode");


  // if class of the parent is .editMode
  if (containsClass) {
    updateItem(label.innerText, editInput.value);

    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the labels text
    editInput.value = label.innerText;
  }
  //Toggle .editMode on the parent 
  listItem.classList.toggle("editMode");
}

// Clear all fields
function clearList(e) {
  document.querySelector('.menu').innerHTML = '';
  deleteAllData();
}

// removed by clicking the delete button
function deleteHotDog(e) {
  let remove = e.target.parentNode;
  let parentNode = remove.parentNode;
  parentNode.removeChild(remove);


  deleteItem(e.target.nextElementSibling.textContent);
}


// read data
function getAllData() {
  return JSON.parse(localStorage.getItem(hotDogsDataName));
}
// set data
function setAllData(data) {
  localStorage.setItem(hotDogsDataName, JSON.stringify(data));
}
// create
function createItem(value) {
  const data = getAllData();
  data.push(value);

  setAllData(data);
}
// delete
function deleteItem(value) {
  let data = getAllData();
  if (data.indexOf(value) != -1) {
    data.splice(data.indexOf(value), 1);

    setAllData(data);
  }
}
// update
function updateItem(oldValue, newValue) {
  let data = getAllData();
  if (data.indexOf(oldValue) != -1) {
    data[data.indexOf(oldValue)] = newValue;

    setAllData(data);
  }
}
// delete all
function deleteAllData() {
  localStorage.removeItem(hotDogsDataName);
}