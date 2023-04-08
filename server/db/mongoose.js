const mongoose = require('mongoose');

const mongodbURL = "mongodb+srv://pasan:pass123@cluster0.wrcovq9.mongodb.net/mydatabase?retryWrites=true&w=majority";
mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
