#!/bin/bash
set -ex
THIS_SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

npm install --prefix $THIS_SCRIPT_DIR xhr2 --save 
npm install --prefix $THIS_SCRIPT_DIR base-64 --save 

$THIS_SCRIPT_DIR/transitions.js "${CHANGELOG}" "${TRANSITION_TO}" "${JIRA_AUTH_USER}" "${JIRA_AUTH_PASSWORD}"
