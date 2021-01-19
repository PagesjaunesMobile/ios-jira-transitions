#!/usr/bin/env node
var XMLHttpRequest = require('xhr2');
var base64 = require('base-64');

let commits = process.argv[2]; 
let newState = process.argv[3]; 
let user = process.argv[4];
let pwd = process.argv[5];

console.log('commits', commits);


let arrayJiras = commits.match(/(#.*) /g);
console.log(
  arrayJiras
);

arrayJiras.forEach(function (item, index) {
  console.log(item, index);
	var s2 = item.substring(1).replace(/ /g,'');
    console.log(s2);
	
	//s2 = "MOBIOS-1703"

  const requestStatus = new XMLHttpRequest();
	
  requestStatus.open('GET', 'https://jira.solocal.com/rest/api/2/issue/'+s2+'/transitions', true)
  requestStatus.setRequestHeader("Content-type", "application/json");
  requestStatus.setRequestHeader("Authorization", "Basic " + base64.encode(user+":"+pwd));

  requestStatus.addEventListener("load", function() {

    console.log("--Transitipns--");
    console.log(requestStatus.responseText);
    console.log("--");
	var data = requestStatus.responseText
	var tt = data.transitions.filter(x => x.name == newState);
	console.log(tt[0].id)
    const request = new XMLHttpRequest();

    var params = {"transition":{"id": tt[0].id}}

    request.open('POST', 'https://jira.solocal.com/rest/api/2/issue/'+s2+'/transitions?expand=transitions.fields', true)
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Authorization", "Basic " + base64.encode(user+":"+pwd));

    request.addEventListener("load", function() {
	     console.log("--resultat Transitipns--");
       console.log(request.readyState);
       console.log(request.status);
       console.log(request.responseText);
	     console.log("--Transitipns--");
      }, false);

    request.send(JSON.stringify(params))
  });
	requestStatus.send()
    }, false);


