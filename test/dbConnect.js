
const
    mongoose = require('mongoose'),
    url = require('../config/database').url;

mongoose.connect(url, error => {
    if (error) throw error;
    else console.log('\x1b[32m%s\x1b[0m', 'Base de données connectée avec succès.');
});
