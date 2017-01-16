// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {clipboard} = require('electron')
const path = require('path');
let isListening = false;
let clipboardData = '';
let theInterval = null;
function checkData() {
    const textFromClipboard = clipboard.readText();
    if(clipboardData !== textFromClipboard) {
      clipboardData = textFromClipboard;
      doNotify();
    }

}

function startStopListening() {
  if(!isListening) {
    clipboardData = clipboard.readText();
    theInterval = setInterval(checkData, 2000);
    isListening = true;
    document.getElementById("notify").innerHTML = "Stop";
  } else {
    clearInterval(theInterval);
    isListening = false;
    document.getElementById("notify").innerHTML = "Start";
  }
}

function doNotify(evt) {

  const options ={
    title: "NRDS Lookup Result",
    body: clipboardData
  }
  new Notification(options.title, options);
}

document.addEventListener('DOMContentLoaded', function() {
document.getElementById("notify").addEventListener("click", startStopListening);

})