
// Se connecte a la base de données
const mongoose = require('mongoose');
const url = require('./config/database').url;

mongoose.connect(url, error => {
    if (error) throw error;
    else console.log('\x1b[32m%s\x1b[0m', 'Base de données connectée avec succès.');
});
mongoose.Promise = global.Promise;

module.exports = mongoose;