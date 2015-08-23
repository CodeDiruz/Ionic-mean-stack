// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    rut: {
        type: String,
        default: '',
        trim: true
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    last_name: {
        type: String,
        default: '',
        trim: true
    },
    full_name: {
        type: String,
        default: '',
        trim: true
    },
    type_profile: {
        type: String,
        default: '',
        trim: true
    },
    token: {
        type: String,
        default: '',
        trim: true
    }

});

module.exports = mongoose.model('Profile', BearSchema);
