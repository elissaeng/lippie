const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 4000;
const db = require('./models/index.js');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);

    next();
});


app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));


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
app.post('/lipsticks', (req, res) => {

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
    db.Lipstick.findById(req.params.id, (err, yayLipstick) => {
        if (err) {
            return console.log(err)
        }
        res.render('lipsticks/lipstickShow', { lipstick: yayLipstick })
    });
});




//Update lipstick list to the product page
app.put('/lipsticks/:id', (req, res) => {
    db.Lipstick.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedLipstick) => {
            if (err) {
                return console.log();
            }
            res.redirect('/lipsticks');
        }
    );
});


app.listen(PORT, () => {
    console.log(`Our app listening at http://localhost:${PORT}`)
});