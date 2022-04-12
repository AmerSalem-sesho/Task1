const express = require ('express');
const router = express.Router();
const Users = require('../Users/Users');
var con = require("../Repository/config");
var queries = require('../Repository/queries');
var users = Users.Users;
var count = Users.count;

//this api call is to get all users
router.get('/all',(req,rs)=>{
    con.query(queries.getAll,(req,res)=>{
          var temp = res;
          rs.render('select',{users:temp});
    });
});

router.get('/addUser',(req,res)=>{
res.render('addUser');
});
router.get("/updateUser/:id",(req,rs)=>{

        con.query(queries.getUser,req.params.id,(req,res)=>{
            var user = res;
            rs.render('updateUser',{users:user[0]});

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
router.post("/addUser",(req,rs)=>{
    con.query(queries.addUser,req.body,(req,res)=>{
      rs.redirect("/api/users/all")
    });
});


//this api call is to update an existing user
router.post("/updateUser/:id",(req,rs)=>{
    var param =[
        req.body,
        req.params.id
    ];
 con.query(queries.updateUser,param,(req,res)=>{
    rs.redirect("/api/users/all");

 });
});

//this api is to delete a user 

router.get("/deleteUser/:id",(req,rs)=>{
      con.query(queries.deleteUser,req.params.id,(req,res)=>{
            rs.redirect("/api/users/all");
      });
});


module.exports = router;
