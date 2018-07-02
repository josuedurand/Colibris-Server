
const fs       = require('fs');
const mongoose = require('mongoose');

const allModels = {};

// chargement des schémas depuis le fichier de configuration JSON dans une variable
const database_models = JSON.parse(fs.readFileSync('models/models.json', 'utf8'));

// Initialisation de chaque schéma par association entre le schéma et la collection
for (modelName in database_models) {
    allModels[modelName] = mongoose.model(modelName, database_models[modelName].schema,
        database_models[modelName].collection);
    console.log("model "+ modelName + " chargé !");
}

// console.log(allModels["Users"].schema);

module.exports = allModels;



