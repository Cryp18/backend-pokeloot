const db = require('mongoose');
require('dotenv').config();
const URI = `${process.env.URI}`;

db.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

.then(db => console.log('DB is connect'))
.catch(err => console.error(err));


module.exports = db;