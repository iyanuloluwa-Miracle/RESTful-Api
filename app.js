const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/nikiDB", { useNewUrlParser: true });

const articlesSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articlesSchema);
//Restful Get request//

//instead of repeatedly using aricles we could make our life easier by doing this

app
  .route("/articles")
  .get(function (req, res) {
    Article.find(function (err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
      //console.log(foundArticles)
      //res.send(foundArticles)
    });
  })
  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save(function (err) {
      if (!err) {
        res.send("Successfully added a new article");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("Successfully deleted all articles ");
      } else {
        res.send(err);
      }
    });
  });




////////  A request targeting a specific article ////////////////////////////
app.route("/articles/:articleTitle")

.get(function(req, res){
  Article.findOne({title:req.params.articleTitle}, function(err, foundArticles){
    if(foundArticles){
      res.send(foundArticles)
    }else{
      res.send("NO articles matching that title was found")
    }

  })
})


//Get Request
//app.get('/articles', function(req,res){
//  Article.find(function(err, foundArticles){
//    if (!err){
//      res.send(foundArticles);

//    }else{
//      res.send(err)
//    }
//    //console.log(foundArticles)
//    //res.send(foundArticles)

//})
//})

//Post Request
//mostly used in form
//app.post('/articles', function(req,res){

//  const newArticle = new Article({
//    title: req.body.title,
//    content:req.body.content
//  })
//  newArticle.save(function(err){
//    if(!err){
//      res.send("Successfully added a new article")
//    }else{
//      res.send(err)
//    }

//  })

//})

//deleting
//app.delete("/articles", function(req,res){
//  Article.deleteMany(function(err){
//    if(!err){
//      res.send("Successfully deleted all articles ")
//    }else{
//      res.send(err)
//    }
//  })

//})
app.get("/", (req, res) => {
  res.send("Api Ready!");
});

app.listen(3002, () => {
  console.log("Example app listening on port 3002!");
});
