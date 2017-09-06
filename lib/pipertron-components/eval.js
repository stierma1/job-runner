var InitializeableComponent = require("../initializable-component");

var config = {}
var Eval = new InitializeableComponent({ name:"EVAL", token:"EVAL", expression:"evalExpression", args:["WHITE_SPACE", "json", "optionalWhiteSpace"], action: function(yy, obs, pipe, white, token, white, str){

  var nObs = obs.map((data) => {
    if(config.EVAL && config.EVAL.ENABLED){
      var returnValue = null;
      eval("(" + fnStr + ")()");
      return returnValue;
    }
    throw new Error("Eval not enabled")
  })

  return nObs;
}}, config);

module.exports = Eval;
