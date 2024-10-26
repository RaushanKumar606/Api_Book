const mongoose = require('mongoose');
const { string } = require('zod');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
      
    },
    coverImage:{
        type:String,
        required:true,
    },
    file:{
        type:String,
        required:true,
    }
    ,
    publishedYear: {
        type: Number,
        required: true,
        min: 1450, 
        max: new Date().getFullYear() 
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        // example genres
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
    }
    ,
   
    summary: {
        type: String,
        maxlength: 1000,
        trim: true
    }
}, 
{
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
