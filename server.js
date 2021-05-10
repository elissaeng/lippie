const express = require('express');
const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home.ejs');
});

// app.get('/products', (req, res) => {
//     res.send('<h1>Lipstick Name</h1>');
// });


app.listen(PORT, () => {
    console.log(`Our app listening at http://localhost:${PORT}`)
});

