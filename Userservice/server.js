'use strict';

let express  = require('express');
const {initTracer } = require("./tracker");
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');
let app =  express();

let dbConn=require('./dbConn')


let getData=require('./initDB')

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const serviceName="User"
let tracer;


app.get('/user',async(req,res,next) =>{
    console.log("requested");
    res.send("data");
})

app.get('/user/:id',async(req,res,next) =>{
  let id = req.params.id;
  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers)
  const span = tracer.startSpan('GETUSERBYID', {
        childOf: parentSpanContext,
        tags: {[Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER}
    });
  span.log({
      'event': 'userRequestDataBYID',
      'value': id
  });  
  span.finish();
  
  console.log("user request ID: "+ id);
  data = await getData.readData(id)
  res.status(200).send(data);
})

app.get('/healthy',async(req,res,next)=>{
    console.log("health status")
    res.status(200).send();
})

app.listen(3000, async function (err) {
    tracer = initTracer(serviceName,process.env.Jaeger_Collector_Host);
     dbConn.CreateDBIFNOtExist(process.env.MYSQl_HOST,process.env.MYSQL_PASSWORD);
    console.log("user service is runing")
})
