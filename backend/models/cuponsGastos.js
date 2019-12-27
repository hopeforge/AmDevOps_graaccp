var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CuposGastoSchema = new mongoose.Schema({     
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required : true
    },
    cupon: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required : true
    },
    data_fim: {
        type: Date,
        required: true
    },
    data_uso: {
        type: Date,
        default: Date.now()
    },
    id: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        default: true
    },
});


var CuposGasto = mongoose.model('CuponsUsados', CuposGastoSchema);

module.exports = CuposGasto;