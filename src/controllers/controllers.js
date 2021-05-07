const controller = {};
const addUser = require('./commands/register');
const pokeapp = require('./commands/pokeapp');
const inventory = require('./commands/inventory');

controller.addUser = addUser;
controller.pokeapp = pokeapp;
controller.inventorySave = inventory.save;
controller.InventoryGet = inventory.find;



module.exports = controller;
