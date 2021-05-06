const db = require('mongoose');
const URI = 'mongodb://localhost:27017/min-proyect';

db.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

.then(db => console.log('DB is connect'))
.catch(err => console.error(err));


module.exports = db;