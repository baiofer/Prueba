"use strict";

const mongoose = require('mongoose');

//Definimos un esquema de Anuncio
const esquelaSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    apellido1: { type: String, index: true },
    apellido2: { type: String, index: true },
    fechaDefuncion: { type: String, index: true },
    fechaEntierro: { type: String, index: true },
    fechaFuneral: { type: String, index: true },
    emisorEsquela: { type: String, index: true },
    localidad: { type: String, index: true },
    foto: { type: String, index: true },
    anagrama: { type: String, index: true },
    textoEsquela: { type: String, index: true },
    datosFuneral: { type: String, index: true },
    libroPesame: { type: String, index: true },
});

//Creamos un método estático
esquelaSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Esquela.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);  //{nombredecampo: 1 campoquenoquiero:0}
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de Anuncio
var Esquela = mongoose.model('Esquela', esquelaSchema);
 
//Exportamos el modelo
module.exports = Esquela;