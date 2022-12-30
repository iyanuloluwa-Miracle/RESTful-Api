const express = require('express')
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express()


app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/nikiDB", { useNewUrlParser: true });

const articlesSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articlesSchema)
//Restful Get request//
app.get('/articles', function(req,res){
  Article.find(function(err, foundArticles){
    if (!err){
      res.send(foundArticles);

    }else{
      res.send(err)
    }
    //console.log(foundArticles)
    //res.send(foundArticles)


  })
})

app.get('/', (req, res) => {
  res.send('Api Ready!')
})

app.listen(3002, () => {
  console.log('Example app listening on port 3002!')
})
