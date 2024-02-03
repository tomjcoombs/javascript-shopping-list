const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllButton = document.getElementById('clear');
const filter = document.getElementById('filter');
const filterInput = document.getElementById('filter');
function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  // validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // create list item 
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  // create button for list item
  const crossButton = createCrossButton('remove-item btn-link text-red');
  li.appendChild(crossButton);

  // add item to list
  itemList.appendChild(li);

  itemInput.value = '';
  checkUI();

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

function removeItem(e) {
  console.log(e.target);

  const item = e.target;
  if(item.tagName === 'I' && item.parentElement.classList.contains("remove-item")) {
    const button = item.parentElement;
    const li = button.parentElement;

    if(confirm('are you sure?')) {
      li.remove();
      checkUI();
    }
  }
}

function removeAllItems(e) {
  while(itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();  
}

function checkUI() {
  const hasListItems = itemList.querySelectorAll('li');
  // console.log('display', filter.style.display);
  
  if(hasListItems.length === 0) {
    filter.style.display = 'none';
    clearAllButton.style.display = 'none';
  } else {
    filter.style.display = '';
    clearAllButton.style.display = '';
  }
}

let searchTerm = '';

function filterList(e) {
  // console.log(e.key);
  searchTerm += e.key;

  // const items = itemList.children;
  const listItems = itemList.querySelectorAll('li');
  listItems.forEach(item => {

    const x = item.firstChild;
    console.log(x.includes(searchTerm));
    // console.log(item.firstChild.includes(searchTerm));
    // if (!item.firstChild.includes(searchTerm)) {
    //   item.style.display = 'none';
    // }
  })
  
  
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearAllButton.addEventListener('click', removeAllItems);
window.addEventListener('load', checkUI);
filterInput.addEventListener('keydown', filterList)
