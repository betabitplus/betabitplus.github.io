"use strict";

// space
var s = "&nbsp;&nbsp;";
// line break
var b = "<br>";
// indent
var i = "&nbsp;";

// letters
var B = "******" + b + "**" + (s + s + s) + "**" + b + "**" + (s + s + s) + "**" + b + "******" + b + "**" + (s + s + s) + "**" + b + "**" + (s + s + s) + "**" + b + "******";
var R = "******" + b + "**" + (s + s + s) + "**" + b + "**" + (s + s + s) + "**" + b + "******" + b + "**" + s + "**" + b + "**" + (s + s) + "**" + b + "**" + (s + s + s) + "**";
var A = s + s + s + i + "**" + (s + s + s + i) + b + "\n         " + (s + s + s) + "***" + (s + s + s) + b + "\n         " + (s + s) + "**" + s + "**" + (s + s) + b + "\n         " + (s + i) + "**" + (s + s) + "**" + (s + i) + b + "\n         " + s + "*******" + s + b + "\n         " + i + "**" + (s + s + s + s + i) + "**" + i + b + "\n         **" + (s + s + s + s + s + s) + "**";

var V = "**" + (s + s + s + s + s + s) + "**" + b + "\n         " + i + "**" + (s + s + s + s + i) + "**" + i + b + "\n         " + s + "**" + (s + s + s) + "**" + s + b + "\n         " + (s + i) + "**" + (s + s) + "**" + (s + i) + b + "\n         " + (s + s) + "**" + s + "**" + (s + s) + b + "\n         " + (s + s + s) + "***" + (s + s + s) + b + "\n         " + (s + s + s + i) + "**" + (s + s + s + i) + b;

var E = "*******" + b + "\n         **" + b + "\n         **" + b + "\n         *******" + b + "\n         **" + b + "\n         **" + b + "\n         *******" + b;

var N = "***" + (s + s + s) + "**" + b + "\n         **" + i + "*" + (s + s + i) + "**" + b + "\n         **" + s + "*" + (s + s) + "**" + b + "\n         **" + (s + i) + "*" + (s + i) + "**" + b + "\n         **" + (s + s) + "*" + s + "**" + b + "\n         **" + (s + s + i) + "*" + i + "**" + b + "\n         **" + (s + s + s) + "***" + b;

var W = "**" + (s + s + s + s + s) + "**" + (s + s + s + s + s) + "**" + b + "\n         " + i + "**" + (s + s + s + s) + "***" + (s + s + s + s) + "**" + b + "\n         " + s + "**" + (s + s + s) + "**" + i + "**" + (s + s + i) + "**" + b + "\n         " + (s + i) + "**" + (s + s) + "**" + (s + i) + "**" + (s + i) + "**" + b + "\n         " + (s + s) + "**" + s + "**" + (s + s + i) + "**" + i + "**" + b + "\n         " + (s + s + s) + "***" + (s + s + s + s) + "***" + b + "\n         " + (s + s + s + i) + "**" + (s + s + s + s + s) + "**" + b;

var O = s + s + s + i + "****" + s + b + "\n         " + (s + s) + "***" + s + "***" + b + "\n         " + s + "**" + (s + s + s + s + s) + "**" + b + "\n         " + i + "**" + (s + s + s + s + s + s) + "**" + b + "\n         " + s + "**" + (s + s + s + s + s) + "**" + b + "\n         " + (s + s) + "***" + s + "***" + b + "\n         " + (s + s + s + i) + "****" + s + b;

var L = "**" + b + "\n         **" + b + "\n         **" + b + "\n         **" + b + "\n         **" + b + "\n         **" + b + "\n         *******" + b;

var D = "*****" + b + "\n         **" + (s + s + i) + "**" + b + "\n         **" + (s + s + s + i) + "**" + b + "\n         **" + (s + s + s + s) + "**" + b + "\n         **" + (s + s + s + i) + "**" + b + "\n         **" + (s + s + i) + "**" + b + "\n         *****" + b;

// letter randomizer
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

// output
var output = function output() {
  document.querySelector('.b').innerHTML = randomize(B);

  var allR = document.querySelectorAll('.r');
  for (var _i = 0; _i < allR.length; _i++) {
    allR[_i].innerHTML = randomize(R);
  } // for (let i of allR) i.innerHTML = randomize(R);

  document.querySelector('.a').innerHTML = randomize(A);
  document.querySelector('.v').innerHTML = randomize(V);

  var allE = document.querySelectorAll('.e');
  for (var _i2 = 0; _i2 < allE.length; _i2++) {
    allE[_i2].innerHTML = randomize(E);
  } // for (let i of allE) i.innerHTML = randomize(E);

  document.querySelector('.n').innerHTML = randomize(N);

  var allW = document.querySelectorAll('.w');
  for (var _i3 = 0; _i3 < allW.length; _i3++) {
    allW[_i3].innerHTML = randomize(W);
  } // for (let i of allW) i.innerHTML = randomize(W);

  document.querySelector('.o').innerHTML = randomize(O);
  document.querySelector('.l').innerHTML = randomize(L);
  document.querySelector('.d').innerHTML = randomize(D);
};

output();

setInterval(function () {
  output();
}, 100);