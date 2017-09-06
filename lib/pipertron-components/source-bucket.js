var InitializeableComponent = require("../initializable-component");
var globalConfig = {};

function fillZeros(num, digits){
  var numStr = num.toString();
  while(numStr.length < digits){
    numStr = "0" + numStr;
  }
  return numStr;
}

var SOURCE_BUCKET = new InitializeableComponent({
  type:"start",
  name:"SOURCE_BUCKET",
  token:"SOURCE_BUCKET",
  args:["optionalWhiteSpace", "json", "optionalWhiteSpace"],
  action: function(yy, token, white, bucketName){
    var bucketDb = globalConfig.SOURCE_BUCKET.BUCKETS_DB;
    var digits = 12;
    var Rx = yy.LIBS.Rx;
    return Rx.Observable.create(async (obs) => {
      var doc = await (bucketDb.get(bucketName + "/length", {include_doc:true}).then((x) => {return x}).catch(() => {}));
      if(!doc){
        obs.error(new Error("Bucket not found: " + bucketName));
        obs.complete();
        return;
      }
      var length = doc.body;
      for(var i = 0; i < length; i++){
        var bucketFeed = bucketName + "/" + fillZeros(i, digits);
        var {body} = await (bucketDb.get(bucketFeed, {include_doc:true}).then((x) => {return x}).catch(() => {return Promise.resolve({})}))
        if(body){
          obs.next(body);
        }
      }
      obs.complete();
    })

}}, globalConfig);

module.exports = SOURCE_BUCKET
