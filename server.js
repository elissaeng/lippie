const express = require('express');
const app = express();
const PORT = 4000;
const db = require('./models/index.js');

app.set('view engine', 'ejs');



app.get('/', (req, res) => {

    res.render('home.ejs');
});

// app.get('/products', (req, res) => {
//     res.send('<h1>Lipstick Name</h1>');
// });

// index route
app.get('/lipsticks', (req, res) => {
    db.Lipstick.find( {}, (err, lipsticks) =>  {
        if (err) {
            return console.log(err)
        } console.log(lipsticks)
        res.render('lipsticks/lipstickIndex.ejs', {
            allLipsticks: lipsticks
        });
    }

    )
});




app.listen(PORT, () => {
    console.log(`Our app listening at http://localhost:${PORT}`)
});

