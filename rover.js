const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position) {
    this.position = position; 
    if (!position) {
       throw Error("Starting position required.");
    }
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(Message) {
    let returnReturn = {
      'message' : Message.name,
      'results' : []
    }

    let returnMessage = [];
    let roverStatuses = {
        'mode' : this.mode,
        'generatorWatts' : this.generatorWatts,
        'position' : this.position
     }
    let statusUpdate = {
      'completed' : true,
      'roverStatus' : roverStatuses
      }
    

    
    for(let i = 0; i < Message.commands.length; i++) {
     
        if (Message.commands[i].commandType === "MOVE") {
          console.log("Move command")
          if (this.mode === "LOW_POWER") {
            statusUpdate.completed = false;
            returnMessage[i] = statusUpdate;
          } else {
            this.position = Message.commands[i].value;
            statusUpdate.completed = true;
            statusUpdate.roverStatus.position = this.position
            returnMessage[i] = statusUpdate;
          }
        } else if (Message.commands[i].commandType === "STATUS_CHECK") {  
          statusUpdate.completed = true
          returnMessage[i] = statusUpdate;
        } else if(Message.commands[i].commandType === "MODE_CHANGE") {
          this.mode = Message.commands[i].value;
          statusUpdate.completed = true;
          statusUpdate.roverStatus.mode = this.mode;
          returnMessage[i] = statusUpdate;
        } else {
        }
      }
       

    returnReturn.results = returnMessage;
    
    return returnReturn; 
  }
}

module.exports = Rover;