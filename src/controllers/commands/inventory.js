const pokedex = require("../../sources/pokedex.json");
const Inventory = require("../../models/inventory");
const users = require("../../models/users");
const inventory = {};

const ordernar = (inventory, orden) => {
  let ordenado = inventory.sort(function (a, b) {
    if (a[orden] > b[orden]) {
      return 1;
    }

    if (a[orden] < b[orden]) {
      return -1;
    }
    return 0;
  });

  return ordenado;
};
const rankCal = (obj) => {
  const res = Object.entries(obj);
  const results = res.reduce((acc, current) => acc + current[1], 0);
  return results;
};

inventory.find = async (req, res) => {
  let myInventory = [];
  let id = req.params.id;
  let order = req.params.order;

  let getInventory = await Inventory.find({
    userId: id.toString(),
    pokemonId: { $exists: true },
  })
    .lean()
    .exec();
  for (let poke in getInventory) {
    myInventory.push(
      pokedex.find((element) => element.id === getInventory[poke].pokemonId)
    );
  }
  if (order === "Pokemon") {
    return res.json(ordernar(myInventory, "id"));
  } else if (order === "Date") {
    return res.json(myInventory);
  } else if (order === "Type") {
    return res.json(ordernar(myInventory, "type"));
  } else if (order === "Range") {
    let ordenado = myInventory.sort(function (a, b) {
      a.stack = rankCal(a.base);
      b.stack = rankCal(b.base);

      if (a.stack > b.stack) {
        return 1;
      }

      if (a.stack < b.stack) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    return res.json(ordenado);
  }
};

inventory.save = async (req, res) => {
  let userId = req.body.userId;
  let pokemonId = req.body.pokemonId;

  const pokeUserFind = await users.findById(userId);

  if (pokeUserFind !== null && pokemonId > 0) {
    let newInventory = new Inventory();
    newInventory.userId = userId;
    newInventory.pokemonId = pokemonId;

    return newInventory;
  }

  return res.json({
    inDataBase: true,
    message: "Se encuentra en la base de oh",
    status: 422,
  });
};

module.exports = inventory;
