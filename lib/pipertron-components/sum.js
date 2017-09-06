var InitializeableComponent = require("../initializable-component");

var config = {}
var Sum = new InitializeableComponent({ name:"SUM", token:"SUM", expression:"sumExpression", args:["optionalWhiteSpace"], action: function(yy, obs, pipe, white, token){

  var nObs = obs.sum()

  return nObs;
}}, config);

module.exports = Sum;
