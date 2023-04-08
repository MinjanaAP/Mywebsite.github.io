const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true,
        trim: true,

    },

    taskDescription : { 
        type : String,
        required : true,
    
    },
    taskDueDate : {
        type : Date,
        required : true,

    },
    taskStatus : {
        type : Boolean,
        default : false,
        required : true,
    },
    // owner :{
    //     type : mongoose.Schema.Types.ObjectId,
    //     required : true,
    // }

})

const task = mongoose.model("task",taskSchema);
    module.exports = task;