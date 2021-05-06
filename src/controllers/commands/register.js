const users = require('../../models/users');

const getUserinfo = async(res, req) => { 
    const pokeUser = req.body.pokeUser;
    const pokeUserFind = await users.findOne({ "pokeUser": pokeUser });

    if (pokeUserFind == null) {
        const newUser = new users();
        newUser.pokeUser = req.body.pokeUser;
        newUser.password = req.body.password;
        newUser.Profile = req.body.photo;
        newUser.envelopes = 3;
        return newUser;
    }
    return res.json({
        inDataBase:true,
        message: 'Se encuentra en la base de datos',
        status: 422
    })
}


module.exports = getUserinfo;
