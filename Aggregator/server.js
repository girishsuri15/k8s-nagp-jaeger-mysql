'use strict';
let express  = require('express');
const orderdetail=require('./orderdetails');
let app =  express();
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/orderdetails/:id',async(req,res,next) =>{
    let id = req.params.id;

    let data = await orderdetail.GetOrderDetail(id);
    console.log(data)
    console.log("user request ID: "+ id);
    res.status(200).send(data);
})
app.get('/healthy',async(req,res,next)=>{
    console.log("health status")
    res.status(200).send();
})
app.listen(3000, function (err) {
    console.log("aggregator service is runing")
})
