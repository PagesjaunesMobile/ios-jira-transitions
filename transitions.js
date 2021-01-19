#!/usr/bin/env node
var XMLHttpRequest = require('xhr2');
var base64 = require('base-64');

let commits = process.argv[2]; 
let newState = process.argv[3]; 
let user = process.argv[4];
let pwd = process.argv[5];

let arrayJiras = commits.match(/(#.*) /g);

arrayJiras.forEach(function (item, index) {
  console.log(item, index);
  var jiraTicket = item.substring(1).replace(/ /g,'');
  console.log(jiraTicket);
	
  const requestStatus = new XMLHttpRequest();
	
  requestStatus.open('GET', 'https://jira.solocal.com/rest/api/2/issue/'+jiraTicket+'/transitions', true)
  requestStatus.setRequestHeader("Content-type", "application/json");
  requestStatus.setRequestHeader("Authorization", "Basic " + base64.encode(user+":"+pwd));

  requestStatus.addEventListener("load", function() {
   console.log(requestStatus.responseText);
   var jsonResponse = JSON.parse(requestStatus.responseText);
   console.log(jsonResponse);
   var newStateData = jsonResponse.transitions.filter(x => x.name == newState);
	
    const request = new XMLHttpRequest();

    var params = {"transition":{"id": newStateData[0].id}}

    request.open('POST', 'https://jira.solocal.com/rest/api/2/issue/'+jiraTicket+'/transitions?expand=transitions.fields', true)
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Authorization", "Basic " + base64.encode(user+":"+pwd));

    request.addEventListener("load", function() {
       console.log("--resultat Transitipns--");
       console.log(request.status);
      }, false);

    request.send(JSON.stringify(params))
  });
	requestStatus.send()
    }, false);


