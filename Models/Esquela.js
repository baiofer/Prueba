'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const flow = require('../lib/flowControl');

//Definimos un esquema de Esquela
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

//Carga un json de anuncios
esquelaSchema.statics.cargaJson = function (fichero, cb) {
  // Encodings: https://nodejs.org/api/buffer.html
  fs.readFile(fichero, { encoding: 'utf8' }, function (err, data) {
    if (err) return cb(err);
    console.log(fichero + ' leido.');
    if (data) {
      const esquelas = JSON.parse(data).esquelas;
      const numEsquelas = esquelas.length;

      flow.serialArray(esquelas, Esquela.createRecord, (err)=> {
        if (err) return cb(err);
        return cb(null, numEsquelas);
      });

    } else {
      //return cb(new Error(fichero + ' está vacio!'));
      return cb(null, 0);
    }
  });
};

esquelaSchema.statics.createRecord = function (nuevo, cb) {
  new Esquela(nuevo).save(cb);
};

//Creamos un método estático
esquelaSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Esquela.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);  //{nombredecampo: 1 campoquenoquiero:0}
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de esquela
var Esquela = mongoose.model('Esquela', esquelaSchema);

//Exportamos el modelo
module.exports = Esquela;