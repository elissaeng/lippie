// Lipstick Model
// -Img Source: Photo URL -Name: String
// -Description: String
// -Shades: String
// -Ingredients: String -Application Technique: String -Price: Number

const mongoose = require("mongoose");


const lipstickSchema = new mongoose.Schema({
    image: String,
    lipstickName: String,
    description: String,
    shades: String,
    ingredients: String,
    applicationTechnique: String,
    price: Number
})

const LipstickModel = mongoose.model('Lipstick', lipstickSchema);

module.exports = LipstickModel;

