var InitializeableComponent = require("../initializable-component");
var globalConfig = {};

function digitize(num, digits){
  var str = num.toString();
  while(str.length < digits){
    str = "0" + str;
  }
  return str;
}

var UPLOAD = new InitializeableComponent({
  name:"UPLOAD",
  token:"UPLOAD",
  args:["optionalWhiteSpace", "json", "optionalWhiteSpace"],
  action: function(yy, obs, pipe, white, token, white, bucketName){
    var bucketDB = globalConfig.UPLOAD.BUCKETS_DB;
    var id = bucketName;
    let i = 0;
    var digits = 12;
    var concurrency = globalConfig.UPLOAD.BUCKETS_DB.CONCURRENCY || 3;
    var bucketFeed = [];
    var inProgress = 0;

    function feed(){

      if(bucketFeed.length === 0 || inProgress > concurrency){
        return;
      }
      inProgress++;
      let item = bucketFeed.shift();

      bucketDB.get(item._id)
        .then((doc) => {
          return bucketDB.remove(doc);
        })
        .catch((err) => {})
        .then(() => {
          return bucketDB.put(item)
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          inProgress--;
          feed()
        })
    }

    return obs.subscribe((data) => {
      let _id = id + "/" + digitize(i, digits);

      bucketFeed.push({_id:_id, creation_time:new Date(Date.now()).toISOString(), status:"normal", body:data})
      i++;
      feed();
    }, (error) => {
      let _id = id + "/" + digitize(i, digits);
      bucketFeed.push({_id:_id, creation_time:new Date(Date.now()).toISOString(), status:"error", body:error})
      i++;
      feed();
    }, () => {
      bucketFeed.push({_id:id + "/length", creation_time:new Date(Date.now()).toISOString(), status:"final", body:i})
      feed();
    });
}}, globalConfig);

module.exports = UPLOAD
