const router = require("express").Router();
const controller = require("../controllers/controllers");
const passport = require("passport");
const users = require("../models/users");

router.post("/signin", (req, res) => {
  controller.addUser(res, req).then(async (newUser, indb) => {
    try {
      if (newUser) {
        await newUser.save();
        return res.send({
          ok: true,
        });
      }
      return indb;
    } catch (error) {
      return error;
    }
  });
});

router.get("/pokeapp/:cant/:id", async (req, res, next) => {
  let id = req.params.id;
  const pokeUserFind = await users.findById(id);

  if (pokeUserFind.envelopes > 0) {
    users
      .findByIdAndUpdate(id, { envelopes: pokeUserFind.envelopes - 1 })
      .exec();
    let data = controller.pokeapp(req, res);
    data.unshift({ status: true, envelopes: pokeUserFind.envelopes - 1 });
    res.json(data);
  } else {
    let current = await users.findById(id);
    res.json({
      status: false,
      envelopes: current.envelopes,
    });
  }
});

router.get("/inventory/:id/:order", controller.InventoryGet);

router.get("/getEnvelopes/:id", async (req, res) => {
  let id = req.params.id;
  const pokeUserFind = await users.findById(id);
  res.json({ envelopes: pokeUserFind.envelopes });
});

router.post("/savePoke", (req, res) => {
  controller.inventorySave(req, res).then(async (newInventory, indb) => {
    try {
      if (newInventory) {
        await newInventory.save();
        return res.send({
          ok: "Save",
        });
      }

      return indb;
    } catch (err) {
      return err;
    }
  });
});

router.post("/login", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = { status: false };
        return res.json(error);
      }
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = {
          _id: user._id,
          pokeUser: user.pokeUser,
          profile: user.Profile,
          user,
          envelopes: user.envelopes,
          status: true,
        };
        return res.json(body);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
