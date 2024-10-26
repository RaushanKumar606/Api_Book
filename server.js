const express =  require('express');
require('dotenv').config()
const {connection} = require('./src/db/db');
//  user reletaderouter 
const userRouter = require('./src/routers/userRouter')
const homeRoutes =require('./src/routers/userRouter')
const loginRouter =require('./src/routers/userRouter')
const contactRouter =require('./src/routers/userRouter')

// service related router 
const createBook = require('./src/routers/bookRouter');
const updateBook = require('./src/routers/bookRouter');
const ListBook = require('./src/routers/bookRouter');
const singleBook = require('./src/routers/bookRouter');
const beleteBook = require('./src/routers/bookRouter');
const errorMiddel = require('./src/middleware/erroeMiddle');
const app =express();


//  middleware 
app.use(express.json())
app.use('/', homeRoutes);
app.use('/api/users',userRouter)
app.use('/api/users',loginRouter)
app.use('/api/users',contactRouter)
app.use('/api/book',createBook)
app.use('/api/book',updateBook)
app.use('/api/book',ListBook)
app.use('/api/book',singleBook)
app.use('/api/book',beleteBook)

app.use(errorMiddel)

const PORT  = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server is on ${PORT}`);
    connection();
})

