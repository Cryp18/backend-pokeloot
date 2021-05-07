const db = require("mongoose");
const URI = `${process.env.URI}`;

db.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

  .then((db) => console.log("DB is connect"))
  .catch((err) => console.error(err));

module.exports = db;
