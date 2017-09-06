var InitializeableComponent = require("../initializable-component");

var config = {}
var Average = new InitializeableComponent({ name:"AVERAGE", token:"AVERAGE", expression:"averageExpression", args:["optionalWhiteSpace"], action: function(yy, obs, pipe, white, token){

  var nObs = obs.average()

  return nObs;
}}, config);

module.exports = Average;
