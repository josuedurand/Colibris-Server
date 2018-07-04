
const
    fs       = require('fs'),
    mongoose = require('mongoose');

// Contiendra tous les modeles mongoose
const allModels = {};

// Charge les schémas depuis le fichier de configuration JSON dans une constante
const databaseModels = JSON.parse(fs.readFileSync('models/models.json', 'utf8'));

// Initialisation de chaque schéma par association entre le schéma et la collection
for (modelName in databaseModels) {
    allModels[modelName] = mongoose.model(
            modelName,
            databaseModels[modelName].schema,
            databaseModels[modelName].collection
        );
    console.log(`model ${modelName} chargé.`);
}

// console.log(allModels["Users"].schema);

module.exports = allModels;
