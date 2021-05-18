const express = require('express');
const router = express.Router();
const {Article} = require('../models/Article');

//Request get all Articles
router.get("/",(req,res)=>{
    Article.find()
    .then(article => res.json(article))
    .catch(err => res.status(400).json(`Error : ${err}`))
});

//Request Add new articles
router.post("/add",(req,res)=>{
    const newArticle = new Article({
        title : req.body.title,
        article : req.body.article,
        author: req.body.author
    });
    newArticle.save()
    .then((docs)=>{
     //console.log('Saved todo', docs);
     res.status(200).json({documents : docs});    
    },(err)=>{
        //console.log('Unable to Save todo', err);
        res.status(400).json({error : err});
    });
});

//Request find article by id
router.get("/:id",(req,res)=>{
    Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(400).json(err));
});

// Request find article by id and update
router.put("/update/:id",(req,res)=>{
    Article.findById(req.params.id)
    .then(article => {
        article.title = req.body.title,
        article.article = req.body.article,
        article.author = req.body.author

        article.save()
        .then(docs => res.json(docs))
        .catch(err => console.log("updated failed"));
    })
    .catch(err => res.status(400).json(err));
});
//request find aricle by id and delete
router.delete("/delete/:id",(req,res)=>{
    Article.findByIdAndDelete(req.params.id)
    .then(()=> res.json("The article deleted"))
    .catch(err => res.json(err));
})
module.exports = router;