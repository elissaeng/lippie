const express = require('express');
const app = express();
const PORT = 4000

app.get('/', (req, res) => {
    res.send('ITS LIPSTICK TIME BROADS')
})

app.listen(PORT, () => {
    console.log(`Our app listening at http://localhost:${PORT}`)
});

