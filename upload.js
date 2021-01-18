#!/usr/bin/env node
var XMLHttpRequest = require('xhr2');
var base64 = require('base-64');

let commits = process.argv[2]; 
let user = process.argv[3];
let pwd = process.argv[4];

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
    console.log(request.responseText);
    console.log("--");

    const request = new XMLHttpRequest();

    var params = {"transition":{"id":71}}

    request.open('POST', 'https://jira.solocal.com/rest/api/2/issue/'+s2+'/transitions?expand=transitions.fields', true)
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Authorization", "Basic " + base64.encode(user+":"+pwd));

    request.addEventListener("load", function() {
       console.log(request.readyState);
       console.log(request.status);
       console.log(request.responseText);
      }, false);

    request.send(JSON.stringify(params))
  });
    }, false);
	


