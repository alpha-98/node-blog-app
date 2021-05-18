require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Models
const {Todo} = require('./models/Todo');    
const {User} = require('./models/User');

//Routers
const articlesRouter = require('./routes/articlesRoute');

//MongoDb Connection
mongoose.Promise = global.Promise; //we need to tell Mongoose that we want to use the built- in promise library as opposed to some third-party one
mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true ,  useUnifiedTopology: true }, (err)=>{
    if(err){
        return console.log("err:",err);
    }
    console.log("connected to DB");
});

const app = express();

//MiddleWare
app.use(bodyParser.json());
app.use(cors());
app.use('/articles',articlesRouter);

//Server Listening
app.listen(3000, () => {
  console.log('Started on port 3000');
});
app.get("/",(req,res)=>{
    res.json("ApI working");
});

app.get('/todos', (req, res) => {
    console.log(req.body);
    var otherTodo = new Todo({
        text : "HI"
    });
    otherTodo.save()
    .then((docs)=>{
     //console.log('Saved todo', docs);
     res.status(200).json({documents : docs});    
    },(err)=>{
        //console.log('Unable to Save todo', err);
        res.status(400).json({error : err});
    });
});

module.exports = {app};