const axios=require('axios');
var qs = require('qs');

const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');
const {initTracer } = require("./tracker");
const serviceName="Aggregator"
tracer = initTracer(serviceName,process.env.Jaeger_Collector_Host);



const GetOrderDetail = async function (id) {
    //  URl read
    const fs = require('fs');
    let rawdata = fs.readFileSync('/mnt/appURL.json');
    let appUrl = JSON.parse(rawdata);
    console.log(appUrl)
    let userurl=appUrl["userURL"];
    let orderurl=appUrl["orderURL"];
    console.log(userurl)
    
    //Aggregator 
    const helloTo="AggregatorORDERUSER"
    const span = tracer.startSpan(serviceName);
    const headers={}
    const method="GET"
    span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_CLIENT);
    const helloStr = helloTo +" "+id;
    span.log({
     event: "string-format",
     value: helloStr,
    });
   console.log(helloStr);
   span.log({ event: "print-string" });
   console.log("get inside")
   tracer.inject(span, FORMAT_HTTP_HEADERS, headers);

    //Send request order and user
    try{
    user_URL=userurl+"/user/"+id;
    order_URL=orderurl+"/order/"+id;
    
    let data= await Promise.all([axios({method:method,url:user_URL,headers}),axios({method:method,url:order_URL,headers})])
    console.log(data[0].data);
    console.log(data[1].data);
    let agg={}
    span.finish();
    agg["userDetails"]= data[0].data
    agg["orders"]=data[1].data["orders"]
    console.log("aggg   "+agg);
    return agg;
    }catch (e) {
        console.error(e);
    }
  }
 
module.exports = {
    GetOrderDetail
};
