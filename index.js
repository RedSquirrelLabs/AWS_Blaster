// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.381235fa-4eb4-4445-b301-63e6f91b035d";
var request = require('request');


var baseUrl = 'https://api.particle.io/v1/devices/3f0037000b47343138333038?access_token=f5c9f9bb496aeb2b47d3c4b2fee5f028a54f2309';
//var powerUrl = 'https://api.particle.io/v1/devices/3f0037000b47343138333038/power?access_token=f5c9f9bb496aeb2b47d3c4b2fee5f028a54f2309';

/**
 * The AlexaSkill prototype and helper functions
 */
var http = require('https');
var AlexaSkill = require('./AlexaSkill');

/**
 * StormTrooper is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var StormTrooper = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
StormTrooper.prototype = Object.create(AlexaSkill.prototype);
StormTrooper.prototype.constructor = StormTrooper;

StormTrooper.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("StormTrooper onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

StormTrooper.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("StormTrooper onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to control your StormTrooper! What is your bidding my lord?";
    response.ask(speechOutput);
};

StormTrooper.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("StormTrooper onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

StormTrooper.prototype.intentHandlers = {

  //Register custom intent handlers
  BlasterCommand: function (intent, session, response) {
    var onoffSlot = intent.slots.onoff;
    var strengthSlot = intent.slots.strength;
    var motivationSlot = intent.slots.motivation;
    var fatherSlot = intent.slots.father;

    var onoff = onoffSlot ? intent.slots.onoff.value : "off";
    var strength = strengthSlot ? intent.slots.strength.value : "";
    var motivation = motivationSlot ? intent.slots.motivation.value : "";
    var fatstat = fatherSlot ? intent.slots.father.value : "";

    var speakText = "";

    console.log("Power Status = " + onoff);
    console.log("Stun Status = " + strength);
    console.log("Motv Status = " + motivation);
    console.log("Father Status = " + fatstat);

      var pwrState = "";
      var strState = "";
      var motvStat = "";
      var fthStat = "";

      var pinvalue = "";
      var pinvalue2 = "";
      var pinvalue3 = "";
      var pinvalue4 = "";

    var deviceid = "3f0037000b47343138333038";
    var accessToken = "f5c9f9bb496aeb2b47d3c4b2fee5f028a54f2309";

    var sparkHst = "api.particle.io";

    console.log("Host = " + sparkHst);

    if (onoff == "on") {
      //  speakText = "Turning on blaster";
        pwrState = "turnon";
    }
    else if (onoff == "up") {
      //  speakText = "Turning off blaster";
        pwrState = "turnon";
    }
    else if (onoff == "off") {
      //  speakText = "Turning off blaster";
        pwrState = "turnoff";
    }
    else if (onoff == "down") {
      //  speakText = "Turning off blaster";
        pwrState = "turnoff";
    }
    else if (strength == "stun") {
        strState = "setstun";
    }
    else if (strength == "normal") {
        strState = "setnormal";
    }
    else if (motivation == "guard") {
        motvStat = "guard";
    }
    else if (motivation == "fail") {
        motvStat = "fail";
    }
    else if (fatstat == "daddy") {
        fthStat = "daddy";
    }
    else if (fatstat == "father") {
        fthStat = "daddy";
    }
    else if (fatstat == "dad") {
        fthStat = "daddy";
        }
    //user asking to turn on/off blaster
    if(pwrState.length > 0) {
      if (pwrState == "turnon") {
        pinvalue = "HIGH";
      }
      else {
        pinvalue = "LOW";
      }
      var sparkPath = "/v1/devices/" + deviceid + "/pwrState";
      console.log("Path = " + sparkPath);
      var args = pinvalue;
      makeParticleRequest(sparkHst, sparkPath, args, accessToken, function(resp){
        var json = JSON.parse(resp);
        console.log(args + ": " + json.return_value);
        response.tellWithCard(args + " is " + json.return_value);
      });
    }

    //user asking to set stun state
    else if(strState.length > 0) {
      if (strState == "setstun") {
        pinvalue2 = "S1";
      }
      else if (strState == "setnormal"){
        pinvalue2 = "S2";
      }
      var sparkPath = "/v1/devices/" + deviceid + "/strState";
      console.log("Path = " + sparkPath);
      var args2 = pinvalue2;
      makeParticleRequest(sparkHst, sparkPath, args2, accessToken, function(resp){
        var json = JSON.parse(resp);
        console.log(args + ": " + json.return_value);
        response.tellWithCard(args + " is " + json.return_value);
      });
    }

    //Luke I am your father
    else if(fthStat.length > 0) {
      if (fthStat == "daddy") {
        pinvalue4 = "X1";
      }
      var sparkPath2 = "/v1/devices/" + deviceid + "/fthStat";
      console.log("Path = " + sparkPath2);
      var args5 = pinvalue4;
      makeParticleRequest(sparkHst, sparkPath2, args5, accessToken, function(resp){
        var json = JSON.parse(resp);
        console.log(args + ": " + json.return_value);
        response.tellWithCard(args + " is " + json.return_value);
      });
    }


    //user asking to set the motivation state
    else if(motvStat.length > 0) {
      if (motvStat == "guard") {
        pinvalue3 = "M1";
      }
      else if(motvStat == "fail"){
        pinvalue3 = "M2";
      }
      var sparkPath = "/v1/devices/" + deviceid + "/motvStat";
      console.log("Path = " + sparkPath);
      var args3 = pinvalue3;
      makeParticleRequest(sparkHst, sparkPath, args3, accessToken, function(resp){
        var json = JSON.parse(resp);
        console.log(args + ": " + json.return_value);
        response.tellWithCard(args + " is " + json.return_value);
      });
    }




    else{
      response.tell("Sorry, I could not understand what you said");
    }
  }

}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MyToaster skill.
    var stormtrooperSkill = new StormTrooper();
    stormtrooperSkill.execute(event, context);
};

//Particle Request
function makeParticleRequest(hname, urlPath, args, accessToken, callback){
	// Particle API parameters
	var options = {
		hostname: hname,
		port: 443,
		path: urlPath,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': '*.*'
		}
	}

	var postData = "access_token=" + accessToken + "&" + "args=" + args;

	console.log("Post Data: " + postData);

	// Call Particle API
	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));

		var body = "";

		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);

			body += chunk;
		});

		res.on('end', function () {
            callback(body);
        });
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(postData);
	req.end();
}
