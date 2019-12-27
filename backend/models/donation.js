var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var donationSchema = new mongoose.Schema({
    hash: {
        type: String
    },
    valor: {
        type: Number,
        required : true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true        
    },
    created_At: {
      type: Date,
      default: Date.now()
    }
});

var donation = mongoose.model('donation', donationSchema);

module.exports = donation;