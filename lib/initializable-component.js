var Component = require("pipertron").Component;

class InitializeableComponent extends Component{
  constructor(config, initializeData){
    super(config);
    this.initializeData = initializeData;
    this.setInitializeData(initializeData);
  }

  setInitializeData(data){
    if(this.initializeData === undefined){
      this.initializeData = data;
    } else {
      if(this.initializeData instanceof Array){
        while(this.initializeData.length !== 0){
          this.initializeData.pop();
        }
      } else if(typeof(this.initializeData) === "object"){
        for(var i in this.initializeData){
          delete this.initializeData[i];
        }
      }

      for(var i in data){
        this.initializeData[i] = data[i];
      }
    }
  }
}

module.exports = InitializeableComponent;
