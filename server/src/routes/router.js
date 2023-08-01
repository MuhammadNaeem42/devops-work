const express = require("express");
const router = express.Router();
const users = require("../models/usersSchema");




// register user 
router.post("/register", async (req,res)=>{
    // console.log(req.body);
    const {userName, email, phoneNumber, profession, address} = req.body;
    // console.log(userName, email, phoneNumber, profession, address);
    if(!userName || !email || !phoneNumber || !profession || !address){
        res.status(404).json("please fill the data");
    }

    try{
        const preUser = await users.findOne({email});
        if(preUser){
            res.status(404).json("This user already present");
        }else{
            const addUser = new users({
                userName, email, phoneNumber, profession, address
            })

            const sendData = await addUser.save();
            res.status(201).json(sendData);
        }
    }catch(err){
        res.status(422).json(err);
    }
})




// get users data 

router.get("/get_data", async (req,res)=>{
   try {
    const getData = await users.find();
   res.status(201).json(getData)
   } catch (error) {
    res.status(422).json(err);
   }
})


// get individula user data 

router.get("/get_data/:_id", async (req,res)=>{
    const {_id} = req.params;

    try {
        const individulUser = await users.findById({_id});
        console.log(individulUser);
        res.status(201).json(individulUser);
    } catch (err) {
        res.status(422).json(err);
    }

})

// update individual user data 

router.patch("/update_user/:id", async(req,res)=>{
    const {id} = req.params;
    try {
        const updateUser = await users.findByIdAndUpdate({_id:id},  req.body, {
            new : true
        });
        res.status(201).json(updateUser);
    } catch (err) {
        res.status(422).json(err);
    }
});


// delete individual user 
router.delete("/delete_user/:id", async (req,res)=>{
    const {id} = req.params;

    try {
        const deletUser = await users.findByIdAndDelete({_id:id})
        res.status(201).json(deletUser);
    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router;