const db = require('mongoose');
const URI = 'mongodb+srv://Basededatosquesepuedehackearfacilmente:Milenio22@cluster0.u9tyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

db.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

.then(db => console.log('DB is connect'))
.catch(err => console.error(err));


module.exports = db;