var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CuposSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    parceiras: {
        type: Schema.Types.ObjectId,
        ref: 'Parceiras',
    },
    data_fim: {
        type: Date,
        required: true
    },
    id: {
        type: String,
        default: Math.random().toString(36).substring(7).toLocaleUpperCase()
    }
});


var Cupos = mongoose.model('Cupons', CuposSchema);

module.exports = Cupos;