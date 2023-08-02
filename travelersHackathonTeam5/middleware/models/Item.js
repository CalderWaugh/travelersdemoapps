const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: { type: Number, require: true, unique: true},
    name: { type: String, require: true, unique: true},
    price: {type: mongoose.Types.Decimal128, required: true},
    categories: {type: [String], required: true},

});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;