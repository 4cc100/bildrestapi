const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const express = require('express');

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true });

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = new mongoose.model("Article", articleSchema);

app.route('/articles')
    .get((req, res) => {
        Article.find({}, (err, results) => {
            if(!err) {
                res.send(results);
            } else {
                res.send(err);
            }
        });
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save((err) => {
            if (!err) {
                res.send("Succesfully added new article");
            } else {
                res.send(err);
            }
        });
    })
    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (!err) {
                res.send('All articles deleted succesfully');
            } else {
                res.send(err);
            }
        });
    });




app.listen(port, () => console.log(`App listening on port ${port}!`))