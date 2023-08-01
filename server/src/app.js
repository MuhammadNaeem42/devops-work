const express = require("express");
const app = express();
const portNumber = 8000;
const mongoose = require("mongoose");
require("./DBConn/__dbConn.js");
const router = require("./routes/router.js");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(router);



app.listen(portNumber, ()=>{
    console.log(`Server start at port no ${portNumber}`);
})
