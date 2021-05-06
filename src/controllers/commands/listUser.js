const User = require('../../models/users');
const Inventory = require('../../models/inventory');
const listUsers = async (req,res)=>{
    const users = await User.find();
    res.json(users);
}

module.exports = listUsers;

