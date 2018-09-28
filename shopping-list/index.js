'use strict';

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

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
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
  console.log('Generating shopping list element');
  
  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');
}

function renderShoppinglist() {
  //render the shopping list in the DOM
  let filteredItems = Array.from(STORE.items);

  if (STORE.hideCompleted === true) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }
  
  if (STORE.searchTerm !== null) {
    filteredItems = filteredItems.filter(item => item.name.includes(STORE.searchTerm));
  }
  
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);
  $('.js-shopping-list').html(shoppingListItemsString);
  console.log('`renderShoppinglist` ran');
}

function addItemtoShoppingList(itemName){
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function searchItemsInShoppingList(itemName){
  STORE.searchTerm = itemName;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);

} 

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function toggleHideItems(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.hideCompleted = !STORE.hideCompleted;
}

function deleteListItem(itemIndex) {
  STORE.items.splice(itemIndex, 1);
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

function handleSearchTerms () {
  $('#js-shopping-list-search').submit(function(event){
    event.preventDefault();
    const searchTerm = $('.js-searchbox').val();
    console.log(searchTerm);
    searchItemsInShoppingList(searchTerm);
    renderShoppinglist();
  });
}



function handleShoppingList() {
  renderShoppinglist();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleToggleHideButton();
  handleDeleteItemClicked();
  handleSearchTerms();

}

$(handleShoppingList);