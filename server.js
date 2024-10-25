const express =  require('express');
require('dotenv').config()
const {connection} = require('./src/db/db');
const app =express();


//  middleware 
app.use('/api/auth')





const PORT  = process.env.PORT || 3030;
app.listen(PORT,()=>{
    console.log(`Server is on ${PORT}`);
    connection();
})

