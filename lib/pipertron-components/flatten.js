var InitializeableComponent = require("../initializable-component");

var config = {}
var Flatten = new InitializeableComponent({ name:"FLATTEN", token:"FLATTEN", expression:"flattenExpression", args:["optionalWhiteSpace"], action: function(yy, obs, pipe, white, token){

  var nObs = obs.flatMap((data) => {
    var o = {};
    o[str] = data;
    return o;
  })

  return nObs;
}}, config);

module.exports = Flatten;
