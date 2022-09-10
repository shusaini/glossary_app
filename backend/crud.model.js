const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let crudTerm = new Schema({
    term: {
        type: String
    },
    definition: {
        type: String
    }
});

module.exports = mongoose.model('glossary_term', crudTerm);