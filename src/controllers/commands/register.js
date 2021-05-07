const users = require("../../models/users");

const getUserinfo = async (res, req) => {
  const pokeUser = req.body.pokeUser;
  const pokeUserFind = await users.findOne({ pokeUser: pokeUser });

  if (pokeUserFind == null) {
    const newUser = new users();
    newUser.pokeUser = req.body.pokeUser;
    newUser.password = req.body.password;
    newUser.Profile =
      req.body.photo !== ""
        ? req.body.photo
        : "https://res.cloudinary.com/miniproyect-checkpoint/image/upload/v1620413185/580b57fcd9996e24bc43c325_bqdaxt.png";
    newUser.envelopes = 20;
    return newUser;
  }
  return res.json({
    inDataBase: true,
    message: "The user who has entered is in use",
    status: 422,
  });
};

module.exports = getUserinfo;
