const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  //  TEST 7

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(12345);
    expect(rover.position).toEqual(12345);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  }
  )

  //  TEST 8
  
  it("response returned by receiveMessage contains name of message", function() {
    let rover = new Rover(12345);
    let command1 = new Command("STATUS_CHECK");
    let command2 = new Command("MOVE",12345);
    let message = new Message("Test Message",[command1, command2]);
    let name = rover.receiveMessage(message);
    expect(name.message).toEqual(message.name);
  })

  //  TEST 9

  it("response returned by receiveMessage contains name of message", function() {
    let rover = new Rover(12345);
    let command1 = new Command("STATUS_CHECK");
    let command2 = new Command("MOVE",12345);
    let message = new Message("Test Message",[command1, command2]);
    let name = rover.receiveMessage(message);
    expect(name.message).toEqual(message.name);
  })

  //  TEST 10

it("responds correctly to status check command", function() {
    let rover = new Rover(12345);
    let command1 = new Command("STATUS_CHECK");
    let message = new Message("Test Message", [command1]);
    let name = rover.receiveMessage(message);

    expect(name.results[0].roverStatus.mode).toEqual(rover.mode)
    expect(name.results[0].roverStatus.position).toEqual(rover.position);
    expect(name.results[0].roverStatus.generatorWatts).toEqual(rover.generatorWatts); 
  })

  //  TEST 11

  it("responds correctly to mode change command", function() {
    let rover = new Rover(12345);
    let command1 = new Command("MODE_CHANGE", "LOW_POWER");
    let command2 = new Command("MODE_CHANGE", "NORMAL");
    let message1 = new Message("Test Message", [command1]);
    let message2 = new Message("Test Message", [command2]);
    let name1 = rover.receiveMessage(message1);
    let name2 = rover.receiveMessage(message2);

    expect(name1.results[0].completed).toEqual(true);
    expect(name1.results[0].roverStatus.mode).toEqual("LOW_POWER");
    expect(name2.results[0].completed).toEqual(true);
    expect(name2.results[0].roverStatus.mode).toEqual("NORMAL");
  })

  // TEST  12

it("responds with false completed value when attempting to move in LOW_POWER mode",   function() {
    let rover = new Rover(12345);
    let command1 = new Command("MODE_CHANGE", "LOW_POWER");
    let command2 = new Command("MOVE", 54321);
    let message1 = new Message("Test Message", [command1]);
    let message2 = new Message("Test Message", [command2]);
    let name1 = rover.receiveMessage(message1);
    let name2 = rover.receiveMessage(message2);

    expect(name2.results[0].completed).toEqual(false);
    expect(name2.results[0].roverStatus.position).toEqual(name1.results[0].roverStatus.position)
  });

  // TEST  13

it("responds with position for move command",   function() {
    let rover = new Rover(12345);
    let command = new Command("MOVE", 88);
    let message = new Message("Test Message", [command]);

    rover.receiveMessage(message);

    expect(rover.position).toEqual(command.value);
  });  
});
