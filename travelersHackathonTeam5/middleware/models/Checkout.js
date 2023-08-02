const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    userId: { type: String, require: true},
    items: { type: [Number], require: true},
    price: {type: String, require: true}
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;