var InitializeableComponent = require("../initializable-component");
var request = require("request");

function wrapProm(url, method, headers, body){
  return new Promise((req, res) => {
    if(headers && headers["Content-Type"] === "application/json"){
      request({method:method||"GET", url:url, headers:headers, json:body}, function(err, resp, body){
        if(err){
          rej(err);
          return;
        }
        res(body);
      });
    } else {
      request({method:method||"GET", url:url, headers:headers, body:body}, function(err, resp, body){
        if(err){
          rej(err);
          return;
        }
        res(body);
      });
    }

  })
}

var config = {}
var CALL_SERVICE = new InitializeableComponent({ name:"CALL_SERVICE", token:"CALL_SERVICE", expression:"callServiceExpression", args:["WHITE_SPACE", "json", "optionalWhiteSpace"], action: function(yy, obs, pipe, white, token, serviceCallName){

  return obs.map((data) => {
    return wrapProm(config.SERVICES[serviceCallName].url, config.SERVICES[serviceCallName].method || "GET", config.SERVICES[serviceCallName].headers || {}, data || {});
  }).concatAll()

}}, config);

module.exports = CALL_SERVICE;
