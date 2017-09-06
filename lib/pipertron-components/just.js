var InitializeableComponent = require("../initializable-component");

var config = {}
var JUST = new InitializeableComponent({type:"start", name:"JUST", token:"JUST", expression:"justExpression", args:["WHITE_SPACE", "json", "optionalWhiteSpace"], action: function(yy, token, white, obj){
  return yy.LIBS.Rx.Observable.of(obj);
}}, config);

module.exports = JUST;
