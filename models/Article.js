const mongoose = require('mongoose');
const Article = mongoose.model('Article',{
    title : {
        type : String,
        required : true
    },
    article : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
});

module.exports = {Article};