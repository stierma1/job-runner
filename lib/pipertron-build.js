var PiperTron = require("pipertron").PiperTron;
var Rx = require("@reactivex/rxjs");

var components = require("./pipertron-components")

module.exports = function(config){
  var comps = components.map((comp)=> {
    comp.setInitializeData(config)
    return comp;
  });
  return new PiperTron(comps, {Rx:Rx})
}
