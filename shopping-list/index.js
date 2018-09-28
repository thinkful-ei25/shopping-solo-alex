'use strict';

function renderShoppinglist() {
  //render the shopping list in the DOM
  console.log('`renderShoppinglist` ran');
}

function handleNewItemSubmit() {
  //responsible for when users add a new shopping item list
  console.log('`handleNewItemSubmit` ran');
}

function handleItemCheckClicked() {
  //responsible for when users want to click the "check" button on an item
  console.log('`handleItemCheckClicked` ran');
}

function handleDeleteItemClicked() {
  //responsible for when users want to delete the selected item
  console.log('`handleDeleteItemClicked` ran');
}

function handleShoppingList() {
  renderShoppinglist();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();

}