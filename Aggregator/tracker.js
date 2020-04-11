const { initTracer: initJaegerTracer } = require("jaeger-client");
//'http://20.43.152.120:14268/api/traces'
module.exports.initTracer = (serviceName,Jaeger_Collector_Host) => {
  const config = {
    serviceName: serviceName,
    
    sampler: {
      type: "const",
      param: 1,
    },
    reporter: {
      logSpans: true,
      collectorEndpoint:Jaeger_Collector_Host
    },
  };
  console.log(Jaeger_Collector_Host)
  const options = {
    logger: {
      info(msg) {
        console.log("INFO ", msg);
      },
      error(msg) {
        console.log("ERROR", msg);
      },
    },
  };
  return initJaegerTracer(config, options);
};
