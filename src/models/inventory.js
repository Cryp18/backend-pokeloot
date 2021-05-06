const {Schema, model} = require('mongoose');

const inventorySchema =  new Schema({
    userId: {type: String },
    pokemonId: {type: Number},
})


module.exports = model('Inventory', inventorySchema);