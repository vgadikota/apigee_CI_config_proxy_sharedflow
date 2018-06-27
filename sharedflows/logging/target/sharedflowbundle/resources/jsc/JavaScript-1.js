

    var logServerURL = "https://endpoint2.collection.us2.sumologic.com/receiver/v1/http/ZaVnC4dhaV3UIyJ1W5ApQcCNFb-GMoxdkLtFgQuSHIFV2OBRT8-ER3LEkdWccbcQhV4l-ZxavKemZuGIiDmIvrOnJboIl647tyg8d8XnrU31eN5gPmJxzQ==";
   
    
    // calculate response times for client, target and total
    var request_start_time = context.getVariable('client.received.start.timestamp');
    var target_start_time  = context.getVariable('target.sent.start.timestamp');
    var target_end_time    = context.getVariable('target.received.end.timestamp');
    var request_end_time   = context.getVariable('system.timestamp');
    var total_request_time = request_end_time-request_start_time;
    var total_target_time  = target_end_time-target_start_time;
    var total_client_time  = total_request_time-total_target_time;

    // Create the log object which can be queried by field in Sumo
    var logObject = {
        "organization": context.getVariable("organization.name"),
        "environment": context.getVariable("environment.name"),
        "apiProduct": context.getVariable("apiproduct.name"),
        "proxyName": context.getVariable("apiproxy.name"),
        "appName": context.getVariable("developer.app.name"),
        "verb": context.getVariable("request.verb"),
        "url": '' + context.getVariable("client.scheme") + '://' + context.getVariable("request.header.host") + context.getVariable("request.uri"),
        "responseReason": context.getVariable("message.reason.phrase"),
        "clientLatency": total_client_time,
        "targetLatency": total_target_time,
        "totalLatency": total_request_time,
        "pathsuffix":context.getVariable("proxy.pathsuffix"),
        "environment.name":context.getVariable("environment.name"),
        "apiproxy.revision":context.getVariable("apiproxy.revision"),
        "apigee.client_id":context.getVariable("apigee.client_id"),
        "apigee.developer.app.name":context.getVariable("apigee.developer.app.name"),
        "request.header.X-Forwarded-For":context.getVariable("request.header.X-Forwarded-For"),
        "client.received.start.timestamp":context.getVariable("client.received.start.timestamp"),
        "client.sent.end.timestamp":context.getVariable("client.sent.end.timestamp"),
        "message.status.code":context.getVariable("message.status.code"),
        "response.status.code":context.getVariable("response.status.code"),
        "request.header.Accept":context.getVariable("request.header.Accept"),
        "request.queryparam.tokenValidityInMin":context.getVariable("request.queryparam.tokenValidityInMin"),
        "request.header.contentLength":context.getVariable("request.header.contentLength"),
        "request.queryparam.correlationId":context.getVariable("request.queryparam.correlationId")
    };
    

    var headers = {
        'Content-Type': 'application/json'
    };


    var myLoggingRequest = new Request(logServerURL, "POST", headers, JSON.stringify(logObject));


    httpClient.send(myLoggingRequest);