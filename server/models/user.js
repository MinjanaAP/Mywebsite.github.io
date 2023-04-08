const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
  
    password : {
        type : String,
        required : true,
        trim : true,
    },
        tokens : [{
            token : {
                type : String,
                
            }
        }]

})


userSchema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
    
    next()

})


userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error();
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error();
    }

    return user;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id : user._id.toString()},"mysecret");
    user.tokens = user.tokens.concat({token});

    await user.save();
    return token;   
};




const User = mongoose.model("user",userSchema);
module.exports = User;
