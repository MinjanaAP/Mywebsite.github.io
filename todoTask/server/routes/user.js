 const express = require("express")
 const router = express.Router();
 const User = require("../models/user")
 const auth = require("../middleware/auth")


 router.post("/users/login",async(req,res)=>{
    try {
        const user = await User.findByCredentials (req.body.email,req.body.password);
        
        // generate token
        const token = await user.generateAuthToken();
        res.send({user,token});

    } catch (error) {
        res.status(401).send(error);
        console.log(error);
        res.send(error);
    }
 })

 router.post("/users/logout",auth,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })

        await req.user.save();
        res.send("logged out");
    } catch (error) {
        res.status(500).send(error);
        
    }
 })

 router.post("/users",async(req,res)=>{
    // todo const user = new User({
    //     name : "test",
    //     email : "test@gmail.com",
    //     age : 25
    // })
    // console.log(req.body);
    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
    
 })

 router.get("/users",async(req,res)=>{
    
    try{
        const users =await User.find({});
        res.status(200).send(users);
    }catch(error){
        res.status(400).send(error);
    } 
 });

 router.get("/users/me",auth,async(req,res)=>{
    // const _id = req.params.id;
    const _id = req.user._id;
    console.log(_id);
    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user);
    }
    catch(error){
        res.status(404).send(error);
     }
 })

 //?update user
 router.patch("/users/me",auth,async(req,res)=>{
try {
         const updatedUser = await User.updatePassword(req.user._id,req.body,{new:true});
        
        if(!updatedUser){
            return res.status(404).send();
        }
        await updatedUser.save();
        res.status(200).send(updatedUser);
    } 
catch (error) {
     res.status(404).send(error);
}
 })

 router.delete("/users/me",auth,async(req,res)=>{
try {
        const deletedUser = await User.findByIdAndDelete(req.user._id);
        if(!deletedUser){
            return res.status(404).send();
        }
        res.status(200).send("User deleted successfully");
} catch (error) {
    res.status(404).send(error);
    
}
 });

 module.exports = router;