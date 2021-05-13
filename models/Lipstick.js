const mongoose = require("mongoose");


const lipstickSchema = new mongoose.Schema({
    lipstickName: String,
    image: String,
    description: String,
    shades: String,
    ingredients: String,
    applicationTechniques: String,
    price: Number
})

const LipstickModel = mongoose.model('Lipstick', lipstickSchema);

module.exports = LipstickModel;

