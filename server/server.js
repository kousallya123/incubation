const express=require('express')
const app=express()
const dotenv =require('dotenv')
const userRouter=require('./routes/users')
const adminRouter=require('./routes/admin')
const cors=require('cors')
app.use(cors())
dotenv.config()


const {connetDb}=require('../server/helpers/mongo')
connetDb()
 
app.use(express.json())
app.use('/',userRouter)



app.listen(5001, 'localhost'); // or server.listen(3001, '0.0.0.0'); for all interfaces
app.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});