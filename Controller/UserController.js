const express = require ('express');
const router = express.Router();
const Users = require('../Users/Users');
var users = Users.Users;
var count = Users.count;

//this api call is to get all users
router.get('/all',(req,res)=>{
    var temp = users;
res.render('select',{users:temp});
});

router.get('/addUser',(req,res)=>{
res.render('addUser');
});
router.get("/updateUser/:id",(req,res)=>{
    users.forEach(user=>{

        if(user.id === parseInt(req.params.id)){
            res.render('updateUser',{users:user});
        }
    });


});
//this api call is to find a user with a specific is
router.get('/:id',(req,res)=>{

    const user = users.filter(user=>user.id === parseInt(req.params.id));

    if(user.length===0)
       res.status(400).json({msg:`Cant find user with id ${req.params.id}`});
       else
         res.json(user);
});

//this api call is to add a new user
router.post("/addUser",(req,res)=>{

    const newUser ={
        id : count++,
        name : req.body.name,
        email : req.body.email,
        age:req.body.age
    };

    if(newUser.name == null || newUser.email == null || newUser.age == null)
       res.status(400).json({msg:"Enter Name,Email and Age"});
       else{
       users.push(newUser);
       res.redirect("/api/users/all")
    }
});


//this api call is to update an existing user
router.post("/updateUser/:id",(req,res)=>{
const exists = users.some(user=>user.id === parseInt(req.params.id));
 if(!exists)
 res.status(400).json({msg:`Cant find user with is ${req.params.id}`});
else{
  
    users.forEach(user=>{

        if(user.id === parseInt(req.params.id)){
            user.name =req.body.name?req.body.name : user.name;
            user.email =req.body.email?req.body.email : user.email;
            user.age =req.body.age?req.body.age : user.age;

            res.redirect("/api/users/all")

        }
    });

}

});


//this api is to delete a user 

router.get("/deleteUser/:id",(req,res)=>{

    const exists = users.some(user=>user.id === parseInt(req.params.id));
    if(!exists)
    res.status(400).json({msg:`Cant find user with is ${req.params.id}`});
    else
        {
            users = users.filter(user=>user.id !== parseInt(req.params.id));
            res.redirect("/api/users/all")
        }

});


module.exports = router;
