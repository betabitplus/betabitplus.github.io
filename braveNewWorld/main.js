"use strict";

var s = "&nbsp;&nbsp;";
var b = "<br>";
var B = "******" + b + "**" + (s + s + s) + "**" + b + "**" + (s + s + s) + "**" + b + "******" + b + "**" + (s + s + s) + "**" + b + "**" + (s + s + s) + "**" + b + "******";
var R = "******" + b + "**" + (s + s + s) + "**" + b + "**" + (s + s + s) + "**" + b + "******" + b + "**" + s + "**" + b + "**" + (s + s) + "**" + b + "**" + (s + s + s) + "**";

var randomize = function randomize(letter) {
  var target = "*";
  var pos = 0;
  var newLetter = "";
  while (true) {
    var foundPos = letter.indexOf(target, pos);
    if (foundPos == -1) break;

    newLetter += letter.slice(pos, foundPos) + ("" + (Math.random() > .5 ? 0 : 1)) + letter.slice(foundPos, 0);
    pos = foundPos + 1;
  }
  return newLetter;
};

setInterval(function () {
  document.querySelector('.b').innerHTML = randomize(B);
}, 200);
document.querySelector('.r').innerHTML = R;