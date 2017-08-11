"use strict";

const mongoose = require('mongoose');

//Definimos un esquema de Anuncio
const localidadSchema = mongoose.Schema({
    codigoPostal: { type: String, index: true },
    localidad: { type: String, index: true },
    provincia: { type: String, index: true },
});

//Creamos un método estático
esquelaSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Localidad.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);  //{nombredecampo: 1 campoquenoquiero:0}
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de Anuncio
var Localidad = mongoose.model('Localidad', esquelaSchema);
 
//Exportamos el modelo
module.exports = Localidad;