const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

//todo create task authenticate
// router.post("/tasks",auth, async (req, res) => {
//     const task = new Task({
//         ...req.body,
//         owner : req.user._id
//     });
//     // const task = new Task({
//     //     description : "test",
//     //     completed : true,
//     //     owner : "5f1f1b2b2b2b2b2b2b2b2b2b"
//     // });
//     try{
//         await task.save();
//         res.status(201).send(task);
//     }catch(err){
//         res.status(400).send(err);
//         console.log(err);
//     }
// });

router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    // const task = new Task({
    //     description : "test",
    //     completed : true,
    //     owner : "5f1f1b2b2b2b2b2b2b2b2b2b"
    // });
    try{
        await task.save();
        res.status(201).send(task);
    }catch(err){
        res.status(400).send(err);
        console.log(err);
        console.log("error");
    }
});


//todo authentication
// router.get("/tasks/me",auth, async (req, res) => {
// try {
//         const getTask = await Task.find({owner:req.user._id});
//         if(!getTask){
//             return res.status(404).send();
//         }
//         res.status(200).send(getTask);
// } catch (error) {
//     res.status(404).send(error);
    
// }
// });

router.get("/tasks/me", async (req, res) => {
    try {
            const getTask = await Task.find({});
            res.status(200).send(getTask);
    } catch (error) {
        res.status(404).send(error);
        
    }
    });

router.patch("/tasks/me",auth,async(req,res)=>{
try {
    const updatedtask = await Task.findOneAndUpdate({owner:req.user._id},req.body,{new:true});
    if(!updatedtask){
        return res.status(404).send();
    }
    res.status(200).send(updatedtask);
        
} catch (error) {
    res.status(404).send(error);
    
}
})

router.delete("/tasks/me",async(req,res)=>{
   try {
     const deleteTask = await Task.findByIdAndDelete(req.params.id);
     if(!deleteTask){
         return res.status(404).send();
     }
        res.status(200).send(deleteTask + " deleted");
   } catch (error) {
    res.status(404).send(error);
   }
});

module.exports = router;