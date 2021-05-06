const User = require('../../models/users');

const deleteUser = async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({
        'status': 'Success Delete User'
    });
}

module.exports = deleteUser;