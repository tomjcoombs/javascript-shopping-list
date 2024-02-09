const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllButton = document.getElementById('clear');
const filter = document.querySelector('.filter'); // change to query selector by class
const filterInput = document.getElementById('filter');

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  // validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  addItemToDOM(newItem);
  addItemToLocalStorage(newItem);

  itemInput.value = '';
  checkUI();
}

function addItemToDOM(item) {
  // create list item 
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  // create button for list item
  const crossButton = createCrossButton('remove-item btn-link text-red');
  li.appendChild(crossButton);

  // add item to list
  itemList.appendChild(li);
}

function addItemToLocalStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);
  // Store in localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function createCrossButton(className) {
  // create button with icon
  const button = document.createElement('button');
  button.className = className;

  // get icon
  const icon = createIcon('fa-solid fa-xmark');

  // add icon to button
  button.appendChild(icon);
  return button;
}

function createIcon(className) {
  // create icon tag
  const icon = document.createElement('i');
  icon.className = className;

  return icon;
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage
}

function displayListItems() {
  const items = getItemsFromStorage();
  items.forEach(item => addItemToDOM(item));
  checkUI();
}

function removeItem(e) {
  const item = e.target;
  if(item.tagName === 'I' && item.parentElement.classList.contains("remove-item")) {
    const button = item.parentElement;
    const li = button.parentElement;

    if(confirm('are you sure?')) {
      li.remove();

      const liText = li.innerText;
      removeItemFromLocalStorage(liText);

      checkUI();
    }
  }
}

function removeAllItems(e) {
  while(itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem('items');

  checkUI();  
}

function removeItemFromLocalStorage(itemToRemove) {
  const items = getItemsFromStorage();
  const newItems = items.filter(item => item !== itemToRemove);

  localStorage.removeItem('items');
  localStorage.setItem('items', JSON.stringify(newItems));
}

function filterList(e) {
  let searchTerm = filterInput.value.toLowerCase();

  const listItems = itemList.querySelectorAll('li');
  listItems.forEach(item => {

    const itemText = item.firstChild.textContent.toLowerCase();

    // if the text is not included hide the list item
    if (!itemText.includes(searchTerm)) {
      item.style.display = 'none';
    } else {
      item.style.display = '';
    }
  }) 
}

function checkUI() {
  const hasListItems = itemList.querySelectorAll('li');
  
  if (hasListItems.length === 0) {
    filter.style.display = 'none';
    clearAllButton.style.display = 'none';
  } else {
    filter.style.display = '';
    clearAllButton.style.display = '';
  }
}

function init() {
// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearAllButton.addEventListener('click', removeAllItems);
document.addEventListener('DOMContentLoaded', checkUI);
document.addEventListener('DOMContentLoaded', displayListItems);
filterInput.addEventListener('keyup', filterList);
}

init();