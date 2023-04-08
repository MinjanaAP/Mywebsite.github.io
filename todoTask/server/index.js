const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose'); // This is the line that is added mongoose to index.js
const cors = require('cors');
const userRouter = require("./routes/user")
const taskRouter = require("./routes/task")

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter)
app.use(taskRouter)

const port = 5000;


app.listen(port,()=>{
    console.log("Server started on port "+port);
}) ;
