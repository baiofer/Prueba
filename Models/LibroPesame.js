"use strict";

const mongoose = require('mongoose');

//Definimos un esquema de Anuncio
const libroPesameSchema = mongoose.Schema({
    nombre: { type: String, index: true },
});

//Creamos un método estático
esquelaSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = LibroPesame.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);  //{nombredecampo: 1 campoquenoquiero:0}
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de Anuncio
var LibroPesame = mongoose.model('LibroPesame', esquelaSchema);
 
//Exportamos el modelo
module.exports = LibroPesame;