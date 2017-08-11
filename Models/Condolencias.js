"use strict";

const mongoose = require('mongoose');

//Definimos un esquema de Anuncio
const condolenciaSchema = mongoose.Schema({
    id: { type: Number, index: true },
    emisorCondolencia: { type: String, index: true },
    mensaje: { type: String, index: true },
    fechaEmision: { type: String, index: true },
    libroPesame: { type: String, index: true },
});

//Creamos un método estático
esquelaSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Condolencia.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);  //{nombredecampo: 1 campoquenoquiero:0}
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de Anuncio
var Condolencia = mongoose.model('Condolencia', esquelaSchema);
 
//Exportamos el modelo
module.exports = Condolencia;