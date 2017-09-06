var InitializeableComponent = require("../initializable-component");
var JSONPath = require("jsonpath-plus");
var config = {}
var MV = new InitializeableComponent({ name:"MV", token:"MV", expression:"mvExpression", args:["WHITE_SPACE", "json", "optionalWhiteSpace"], action: function(yy, obs, pipe, white, token, white, str){

  var nObs = obs.map((data) => {
    var path = "$." + str;
    var result = JSONPath({path: path, json: data});
    return result && result[0]
  })

  return nObs;
}}, config);

module.exports = MV;
