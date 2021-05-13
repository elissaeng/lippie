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

app.use(express.static('public'))

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
    console.log(req.body)
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
            return console.log(err);
        } console.log(yayLipstick);
        res.render('lipsticks/lipstickShow', { lipstick: yayLipstick })
    });
});

// Edit Lipstick
app.get('/lipsticks/:id/edit', (req, res) => {
    db.Lipstick.findById(req.params.id, (err, lipstickToEdit) => {
        if (err) {
            return console.log(err);
        }
        res.render('lipsticks/lipstickEdit', { lipstick: lipstickToEdit });
    });
});


// Update lipstick list to the product page
app.put('/lipsticks/:id', (req, res) => {
    console.log('stressed and dying')
    db.Lipstick.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedLipstick) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/lipsticks');
        }
    );
});


// Delete
app.delete('/lipsticks/:id', (req, res) => {
    db.Lipstick.findByIdAndDelete(req.params.id, (err, deletedLipstick) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/lipsticks');
    })
})



// Index Route
app.get('/users', (req, res) => {
    db.User.find({}, (err, users) => {
        if (err) {
            return console.log(err)
        } console.log(users)
        res.render('users/userIndex.ejs', {
            allUsers: users,
        });
    });
});

//  User Route
app.get('/users/new', (req, res) => {
    res.render('users/userNew')
})

app.get('/users/:id/shoppingCart', (req, res) => {
    db.Lipstick.find({}, (err, lipsticks) => {
        if (err) {
            return console.log(err)
        } console.log(lipsticks)
        res.render('users/addShoppingCart.ejs', {
            allLipsticks: lipsticks, id: req.params.id
        });
    });

})

app.get('/users/:id/shoppingCart/add/:lipstickId', (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        db.Lipstick.findById(req.params.lipstickId, (err, foundLipstick) => {
            foundUser.shoppingCart.push(foundLipstick);
            foundUser.save().then(savedUser => {
                res.redirect(`/users/${req.params.id}`)
            })
        })
    })

})

// app.delete('/users/:id/shoppingCart/delete/:lipstickId', (req, res) => {
//     db.User.findByIdAndUpdate(req.params.id, (err, foundUser) => {
//         db.Lipstick.findById(req.params.lipstickId, (err, foundLipstick) => {
//             foundUser.shoppingCart.pop(foundLipstick);
//             foundUser.save().then(savedUser => {
//                 res.redirect(`/users/${req.params.id}`)
//             });
//         });
//     });
// });

// app.delete('/users/:id/shoppingCart/delete/:lipstickId', (req, res) => {
//     console.log('is this working')
//     db.User.findByIdAndUpdate(
//         req.params.id,
//         { $pull: { lipsticks: req.params.lipstickId } },
//         (err) => {
//             if (err) return console.log(err);

//             res.redirect('/users');

//         });
// });

app.get('/users/:id/shoppingCart/delete/:lipstickId', (req, res) => {
    db.Lipstick.find({}, (err, lipsticks) => {
        if (err) {
            return console.log(err)
        } console.log(lipsticks)
        res.render('users/addShoppingCart.ejs', {
            allLipsticks: lipsticks, id: req.params.id
        });
    });
})

app.get('/users/:id', (req, res) => {
    db.User.findById(req.params.id).populate('shoppingCart').exec((err, yayUser) => {
        if (err) {
            return console.log(err);
        } console.log(yayUser);
        res.render('users/userShow', { user: yayUser })
    });
});

// Create Route
app.post('/users', (req, res) => {
    console.log(req.body)
    db.User.create(req.body, (err, newUser) => {
        if (err) {
            return console.log(err);
        }
        console.log(newUser);

        res.redirect('/users');
    });
});



app.listen(PORT, () => {
    console.log(`Our app listening at http://localhost:${PORT}`)
});