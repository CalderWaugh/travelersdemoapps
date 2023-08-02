const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, require: true, unique: true},
    items: { type: [Number], require: true}
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart || mongoose.model('Cart', cartSchema);