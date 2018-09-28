'use strict';
//data set
const STORE = {
  items: [
    {name: 'apple', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  hideCompleted: false,
  searchTerm: null,
};

//supplementary functions
function generateItemElement(item, itemIndex, template) {
  //html code for each generated item in data set
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
        </button> 
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  //generates shopping list based off data set in the "items" array
  
  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');
}

function addItemtoShoppingList(itemName){
  //adds item to data set in the "items" array
  STORE.items.push({name: itemName, checked: false});
}

function searchItemsInShoppingList(itemName){
  //updates value of "searchTerm" property
  STORE.searchTerm = itemName;
}

function getItemIndexFromElement(item) {
  //returns index of number
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);

} 

function toggleCheckedForListItem(itemIndex) {
  //switches boolean of "checked" property
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function toggleHideItems(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.hideCompleted = !STORE.hideCompleted;
}

function deleteListItem(itemIndex) {
  //removes item at specific index in "items" array
  STORE.items.splice(itemIndex, 1);
}

function editListItem(itemIndex, itemEdit) {
  //replaces item at specifed index with itemEdit
  STORE.items.splice(itemIndex, 1, itemEdit);
}

function editChangeForm(itemIndex) {
  //replaces html to create "edit" text box at specific index 
  //and calls function to replace values
  $(`[data-item-index="${itemIndex}"`)
    .find('.shopping-item')
    .replaceWith('<input type= "text" class="edittext" autofocus><button class= "editsubmit">Submit Changes</button>');
  editSubmit(itemIndex);
}

function editSubmit(itemIndex) {
  //replaces object name property with input edited name
  $('.editsubmit').click(event => {
    event.preventDefault();
    let edit = $('.edittext').val();
    editListItem(itemIndex, { name: edit, checked: false });
    renderShoppinglist();
  });
}

//main program functions
function renderShoppinglist() {
  //render the shopping list in the DOM based
  //conditionals are rendering for hiding checked items or search term
  let filteredItems = Array.from(STORE.items);

  if (STORE.hideCompleted === true) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }
  
  //this allows partial searches to return results 
  //and reset the original list if nothing is passed in search 
  if (STORE.searchTerm !== null) {
    filteredItems = filteredItems.filter(item => item.name.includes(STORE.searchTerm));
  }
  
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);
  $('.js-shopping-list').html(shoppingListItemsString);
  console.log('`renderShoppinglist` ran');
}

function handleNewItemSubmit() {
  //responsible for when users add a new shopping item list
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);
    $('.js-shopping-list-entry').val('');
    addItemtoShoppingList(newItemName);
    renderShoppinglist();
  });
}

function handleItemCheckClicked() {
  //responsible for when users want to click the "check" button on an item
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppinglist();
  });
}

function handleDeleteItemClicked() {
  //responsible for when users want to delete the selected item
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppinglist();
  });
}

function handleToggleHideButton() {
  $('#toggle-completed-filter').click(function(event){
    toggleHideItems(STORE.items);
    renderShoppinglist();
  })
}

function handleSearchTerms() {
  $('#js-shopping-list-search').submit(function(event){
    event.preventDefault();
    const searchTerm = $('.js-searchbox').val();
    console.log(searchTerm);
    searchItemsInShoppingList(searchTerm);
    renderShoppinglist();
  });
}

function handleEditItemName() {
  $('.js-shopping-list').on('click', '.js-item-edit', event => {
    console.log('`handleEditItemName` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    editChangeForm(itemIndex);
  });
}


function handleShoppingList() {
  renderShoppinglist();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleToggleHideButton();
  handleDeleteItemClicked();
  handleSearchTerms();
  handleEditItemName();
}

$(handleShoppingList);