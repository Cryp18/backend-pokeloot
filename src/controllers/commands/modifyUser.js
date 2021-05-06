const User = require('../../models/users');
const bcrypt = require('bcrypt');

let pass = bcrypt.hash('1234', 10);

const modifyUser = async (req,res) => {
    await User.updateMany({}, {$set: {envelopes: 3}})
    res.json({
        'status': 'Success Modify User'
    });
};

module.exports = modifyUser;