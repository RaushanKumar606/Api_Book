const express =  require('express');
require('dotenv').config()
const {connection} = require('./src/db/db');

const app =express();
const PORT  = process.env.PORT || 3030;
app.listen(PORT,()=>{
    console.log(`Server is on ${PORT}`);
    connection();
})

