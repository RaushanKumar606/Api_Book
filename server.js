const express =  require('express');
require('dotenv').config()
const {connection} = require('./src/db/db');
const userRouter = require('./src/routers/userRouter')
const homeRoutes =require('./src/routers/userRouter')
const loginRouter =require('./src/routers/userRouter')
const app =express();


//  middleware 
app.use(express.json())
app.use('/', homeRoutes);
app.use('/api/users',userRouter)
app.use('/api/users',loginRouter)






const PORT  = process.env.PORT || 3030;
app.listen(PORT,()=>{
    console.log(`Server is on ${PORT}`);
    connection();
})

