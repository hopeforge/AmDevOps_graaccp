var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ParceirasSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },     
    endereco: {
        type: String,
        required: true
    }
});


var Parceiras = mongoose.model('Parceiras', ParceirasSchema);

module.exports = Parceiras;