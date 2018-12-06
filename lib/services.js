
var Service;
var Characteristic;

module.exports = function (commander, commanderService, commanderCharacteristic) {
  Service = commanderService;
  Characteristic = commanderCharacteristic;
  commander.log("help")
}

//Add the service to wanted command
module.exports.addService = function(that) {
    //Log the type
    that.log("Adding", that.name, "as", that.type);
    //Chose the wanted service
    switch (that.type)
    {
        case "switch":
        {
            that.service = new Service.Switch(that.name);
            break;
        }
        case "lightbulb":
        {
            that.service = new Service.Lightbulb(that.name);
            break;
        }
        case "outlet":
        {
            that.service = new Service.Outlet(that.name);
            break;
        }
        case "speaker":
        {
            that.service = new Service.Speaker(that.name);
            break;
        }
        case "windowcovering":
        {
            that.service = new Service.WindowCovering(that.name);
            break;
        }
    }
  }

module.exports.addCharacteristic = function(that) {
    //Check each Characteristic.
    //Some are required with some are optional

    //PowerState
    if( (that.type == "switch")     ||
        (that.type == "lightbulb")  ||
        (that.type == "outlet")     ||
        ((that.type == "custom") && that.settings.powerstate))
        {
            that.service.getCharacteristic(Characteristic.On)
            .on('set', that.setPowerState.bind(that))
            .on('get', that.getPowerState.bind(that));
        }
    
  }