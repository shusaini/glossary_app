const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const crudRoutes = express.Router();
let Crud = require('./crud.model');

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=GlossaryDB%20Compass%20Community&ssl=false/crud_mern',
//    { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/GlossaryDB',
    { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

crudRoutes.route('/').get((req, res) => {
    Crud.find((err, results) => {
        if (err) console.log(err);
        else res.json(results);
    });
});

crudRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Crud.findById(id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send('Result not found')
        }
        else res.json(result);
    });
});

crudRoutes.route('/add').post((req, res) => {
    let list = new Crud(req.body);
    list.save().then(list => {
        res.status(200).json({'list': 'Term added successfully'});
    }).catch(err => {
        res.status(400).send('Adding failed');
    });
});

crudRoutes.route('/update/:id').post((req, res) => {
    Crud.findById(req.params.id, (err, data) => {
        if (!data) res.status(404).send("Term is not found");
        else {
            data.term = req.body.term;
            data.definition = req.body.definition;
            
            data.save().then(data => {
                res.json('Data term is updated!');
            }).catch(err => {
                res.status(400).send("Update isn't possible");
            });
        }
    });
});

crudRoutes.route('/delete/:id').delete((req, res) => {
    Crud.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(500).send("There was a problem deleting the term.");
        res.status(200).send(`Term ${data.term} was deleted`);
    })
})

app.use('/all_term', crudRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
})