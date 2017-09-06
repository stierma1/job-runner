var InitializeableComponent = require("../initializable-component");

var config = {}
var Count = new InitializeableComponent({ name:"COUNT", token:"COUNT", expression:"countExpression", args:["optionalWhiteSpace"], action: function(yy, obs, pipe, white, token){

  var nObs = obs.count()

  return nObs;
}}, config);

module.exports = Count;
