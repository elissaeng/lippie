const express = require('express');
const app = express();
const PORT = 4000;
const db = require('./models/index.js');

app.set('view engine', 'ejs');

// Home Route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// Index Route
app.get('/lipsticks', (req, res) => {
    db.Lipstick.find({}, (err, lipsticks) => {
        if (err) {
            return console.log(err)
        } console.log(lipsticks)
        res.render('lipsticks/lipstickIndex.ejs', {
            allLipsticks: lipsticks,
        });
    });
});

//Create Route to create/add new lipstick
app.post('/lipsticks/lipstickNew.ejs', (req, res) => {
    if (err) {
        return console.log(err);
    }
    db.Lipstick.create(req.body, (err, newLipstick) => {
        if (err) {
            return console.log(err);
        }
        console.log(newLipstick);
    
        res.redirect('/lipsticks');
    });
});


//New Route - To show a form to the user/admin to add new lipstick
app.get('/lipsticks/new', (req, res) => {
    res.render('lipsticks/lipstickNew.ejs');
});

// Show Route
app.get('/lipsticks/:id', (req, res) => {
    db.LipstickModel.findById(req.params.id, (err, yayLipstick) => {
        if (err) {
            return console.log(err)
        }
        res.render('show', { lipstick: yayLipstick})
    });
}); 










app.listen(PORT, () => {
    console.log(`Our app listening at http://localhost:${PORT}`)
});

