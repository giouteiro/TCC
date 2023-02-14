const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    escultura: {
        type: 'String',
    },
    pintura: {
        type: 'String',
    },
    gravura: {
        type: 'String',
    },
    desenho: {
        type: 'String',
    },
    ceramica: {
        type: 'String',
    },
    fotografia: {
        type: 'String',
    }
})

const Tipodb = mongoose.model('tipodb', schema);

module.exports = Tipodb;