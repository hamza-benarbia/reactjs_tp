const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const user = require("../../models/User");



//@route POST api/users
//@desc Register new user
//@access Public
router.post("/register",(req,res)=>{
    let{name,email,password,role="user"}=req.body;
if(!name|| !email || !password || !role)
return res.status(400).send({msg:"Please enter all data"});


user.findOne({email:email}).then((user)=>{
    if(user)return res.status(400).send({msg:"Email Already exist"});
});

let newUser= new user({name,email,password,role});
bcrypt.genSalt(10,(err,salt)=>{
    if(err)throw err;
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err)throw err;
        newUser.password=hash;
    newUser.save().then((user)=>{
        jwt.sign(
    {
        id:user.id
    },
    config.get("jwtSecret"),
    {expiresIn:config.get("tokenExpire")},
    (err,token)=>{
        if(err)throw err;

res.json({token,
    user:{
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role,
},
    });
    }
    );
});
});
});
});

module.exports = router;







// @route   PUT api/users 

// @desc    Update user 

// @access  Private 

router.put("/maj/:id",async(req,res)=>{ 

    try{ 
    
    await User.findOneAndUpdate( 
    
    {_id:req.params.id}, 
    
    {name:req.body.name}, 
    
    ); 
    
    res.send("Mise à jour avec succès") 
    
    } 
    
    catch(err){ 
    
    console.log(err); 
    
    } 
    
    }); 

    router.get('/',async(req,res)=>{
        try{
            await User.find({})
            .then(result=>{
                res.send(result)
            })
    
        }
        catch(err)
        {
            console.log(err)
        }
        
    })
    


// @route   POST api/users
// @desc    Delete user
// @access  Private && ADMIN
router.delete("/supprimer/:id",async(req,res)=>{
    try{
        await User.findOneAndDelete({_id:req.params.id})
        res.send("supprimé avec succès")
       
    }
    catch(err){
        console.log(err);
    }

});