var InitializeableComponent = require("../initializable-component");

var config = {}
var Label = new InitializeableComponent({ name:"LABEL", token:"LABEL", expression:"labelExpression", args:["WHITE_SPACE", "json", "optionalWhiteSpace"], action: function(yy, obs, pipe, white, token, white, str){

  var nObs = obs.map((data) => {
    var o = {};
    o[str] = data;
    return o;
  })

  return nObs;
}}, config);

module.exports = Label;
