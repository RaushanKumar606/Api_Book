const express = require("express");
const router = express.Router();
const BookAdmin  =  require('../controller/bookController');
const auth = require('../middleware/authentication')
const path = require('path'); 
const multer = require("multer");

const upload = multer({
    dest:path.resolve(__dirname,'../../public/data/upload'),
    limits:{fileSize:3e7}
})

router.route('/publish').post( auth,upload.fields([
    
        {name:'coverImage',maxCount:1},
        {name:'file',maxCount:1}
    ]),BookAdmin.createBook)


    router.route('/:bookId').patch(auth,upload.fields([
        {name:'coverImage',maxCount:1},
        {name:'file',maxCount:1}
    ]) ,BookAdmin.updateBook)


    router.route('/').get(BookAdmin.listBook)
    router.route('/:bookId').get(BookAdmin.singleBook);

    router.route('/:bookId').delete(auth,BookAdmin.deleteBook)

module.exports = router;