const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');

exports.login = async(req,res)=>{
    
    try{
        const{email,name} = req.body;
        const user = await User.findOne({email});
       

        if(user){
            console.log("user exists");
            const token = jwt.sign({email:user.email, userId: user._id}, 'secretKeyChangeThisLater');       
            res.status(200).json({data:{token,user}, message:"Login successful"});
        }else{
            console.log("user doesn't exists");
            const  newUser = new User({
                name,
                email,
                password:"password"
            });
            await newUser.save();    
            const token = await jwt.sign({email:user.email, userId: user._id}, 'secretKeyChangeThisLater');       
            res.status(200).json({data:{token,user}, message:"Login successful"});
        }
    } catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
    };
