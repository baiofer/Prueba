'use strict'

const mongoose = require('mongoose');
const readLine = require('readline');
const async = require('async');

const db = require('./lib/connectDB');

//Cargamos las definicones de nuestros modelos
require('./Models/Esquela');
//require('./models/Localidad');
//require('./models/LibroPesame');
//require('./models/Condolencia');

db.once('open', () => { 
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Are you sure you want to empty DB? (no) ', (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB install aborted!');
            return process.exit(0);
        }
    });
})
    
function runInstallScript() {
    async.series([
        initEsquelas,
        //initLocalidades,
        //initLibrosPesame,
        //initCondolencias
    ], (err) => {
        if (err) {
            console.error('Hubo un error: ', err);
            return process.exit(1);
        }
        return process.exit(0);
        }
    );
}

function initEsquelas(cb) {
  const Esquela = mongoose.model('Esquela');
  Esquela.remove({}, ()=> {
    console.log('Esquelas borradas.');
    // Cargar esquelas.json
    const fichero = './esquelas.json';
    console.log('Cargando ' + fichero + '...');
    Esquela.cargaJson(fichero, (err, numLoaded)=> {
      if (err) return cb(err);
      console.log(`Se han cargado ${numLoaded} esquelas.`);
      return cb(null, numLoaded);
    });
  });
}