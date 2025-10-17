const mongoose = require('mongoose');
const kittyShcema = new mongoose.Schema({ name: String });
const Kitten = mongoose.model('Kitten', kittyShcema);
// const cat = new Kitten({ name: 'HHT' });
// cat.save();
module.exports = Kitten;