var InitializeableComponent = require("../initializable-component");
var globalConfig = {};

var AGGY = new InitializeableComponent({
  name:"AGGY",
  token:"AGGY",
  args:["optionalWhiteSpace", "json", "WHITE_SPACE", "json", "optionalWhiteSpace"],
  action: function(yy, obs, pipe, white, token, white, maxConcurrency, white, queries){
    var Rx = yy.LIBS.Rx;
    var aggy = globalConfig.AGGY.createFalcorClient();
    var waitFeed = [];
    var concurrency = parseInt(maxConcurrency) > 1 ? parseInt(maxConcurrency) : 1;
    var inProgress = 0;
    function feed(){
      if(waitFeed.length === 0 || inProgress >= concurrency){
        return;
      }
      inProgress++;
      let [rQueries, res] = waitFeed.shift();
      var val = null;
      var error = null;
      res(aggy.get.apply(aggy, rQueries).then((x) => {
        val = x;
        return x
      }).catch((err) => {
        error = err;
      }).then(() => {
        inProgress--;
        feed();
        if(error){
          throw error;
        }
        return val;
      }));

    }
    return obs.map((param) => {
      var rQueries = queries.map((q) => {
        var ret = q;
        for(var i in param){
          while(ret !== ret.replace("${" +i + "}", param[i])){
            ret = ret.replace("${" +i + "}", param[i]);
          }
        }
        return ret;
      });
      var res1 = null;
      var p = new Promise((res, rej) => {
        res1 = res;
      });

      waitFeed.push([rQueries, res1]);
      feed();
      return p;
    }).concatMap((d) => {
      return d;
    });
}}, globalConfig);

module.exports = AGGY
