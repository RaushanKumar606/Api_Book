const mongoose = require('mongoose');
const contactSchema  = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        
    },
    phone:{
        type:Number
    },
    comment:{
        type: String,
        required: true,
        minlength: 15,
        maxlength: 100,
        trim: true
    },
    
},{timestamps: true})
const Contact = mongoose.model("Contact",contactSchema);
module.exports = Contact;


