const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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

// Event Listeners
itemForm.addEventListener('submit', addItem);