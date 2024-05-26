const knex = require("./knex");

// Inserting row in Cocktail table
function createItem(item) {
  return knex("cocktails").insert(item);
}

// Checking if drink already exists in database
function checkDrinkId(item) {
  return knex("cocktails").select('drink_id').where({ drink_id: item.drink_id }).first();
}

// Getting all items with orderBy parameter
function getAllItems(orderBy) {
  if (orderBy === false)
    return knex("cocktails").select("*");
  else
    return knex("cocktails").select("*").orderBy(orderBy, "desc");

}

// Getting single item by ID
function getItem(id) {
  return knex("cocktails").where("id", id).select("*");
}

// Deleting item by ID
function deleteItem(id) {
  return knex("cocktails").where("id", id).del();
}

// Updating item by id and new item
function updateItem(id, item) {
  return knex("cocktails").where("id", id).update(item);
}

// exporting CRUD functions
module.exports = {
  createItem,
  checkDrinkId,
  getAllItems,
  getItem,
  deleteItem,
  updateItem
}