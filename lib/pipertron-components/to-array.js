var InitializeableComponent = require("../initializable-component");

var config = {}
var To_Array = new InitializeableComponent({ name:"TO_ARRAY", token:"TO_ARRAY", expression:"toArrayExpression", args:["optionalWhiteSpace"], action: function(yy, obs, pipe, white, token){

  var nObs = obs.toArray();

  return nObs;
}}, config);

module.exports = To_Array;
