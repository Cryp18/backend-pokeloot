const controller = {};
const modifyUser = require('./commands/modifyUser');
const deleteUser = require('./commands/deleteUser');
const listUsers = require('./commands/listUser');
const addUser = require('./commands/register');
const pokeapp = require('./commands/pokeapp');
const inventory = require('./commands/inventory');

controller.modifyUser = modifyUser;
controller.deleteUser = deleteUser;
controller.listUsers = listUsers;
controller.addUser = addUser;
controller.pokeapp = pokeapp;
controller.inventorySave = inventory.save;
controller.InventoryGet = inventory.find;



module.exports = controller;
