var InitializeableComponent = require("../initializable-component");
var JSONPath = require("jsonpath-plus");
var config = {}

var FILTER_TRUTHY = new InitializeableComponent({ name:"FILTER_TRUTHY", token:"FILTER_TRUTHY", expression:"filterTruthyExpression", args:["WHITE_SPACE", "json", "optionalWhiteSpace"], action: function(yy, obs, pipe, white, token, white, str){

  var nObs = obs.filter((data) => {
    if(str === ""){
      return data;
    }
    var path = "$." + str;
    var result = JSONPath({path: path, json: data});
    return result && result[0]
  })

  return nObs;
}}, config);

module.exports = FILTER_TRUTHY;
