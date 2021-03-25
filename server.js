require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
var fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


//Routes

app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./jobPost/routes'))
app.use('/cv', require('./routes/uploadRouter'))
app.use('/usercv', require('./CV/routes'))


//connect mongodb
const URI = process.env.MONGODB_URI


mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("connected to mongo db");
  
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`)
})

