'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const flow = require('../lib/flowControl');

//Definimos un esquema de Localidad
const localidadSchema = mongoose.Schema({
    codigoPostal: { type: String, index: true },
    localidad: { type: String, index: true },
    provincia: { type: String, index: true },
});

//Carga un json de localidades
localidadSchema.statics.cargaJson = function (fichero, cb) {
  // Encodings: https://nodejs.org/api/buffer.html
  fs.readFile(fichero, { encoding: 'utf8' }, function (err, data) {
    if (err) return cb(err);
    console.log(fichero + ' leido.');
    if (data) {
      const localidades = JSON.parse(data).localidades;
      const numLocalidades = localidades.length;

      flow.serialArray(localidades, Localidad.createRecord, (err)=> {
        if (err) return cb(err);
        return cb(null, numLocalidades);
      });

    } else {
      //return cb(new Error(fichero + ' está vacio!'));
      return cb(null, 0);
    }
  });
};

localidadSchema.statics.createRecord = function (nuevo, cb) {
  new Localidad(nuevo).save(cb);
};

//Creamos un método estático
localidadSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Localidad.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);  //{nombredecampo: 1 campoquenoquiero:0}
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de localidad
var Localidad = mongoose.model('Localidad', localidadSchema);

//Exportamos el modelo
module.exports = Localidad;