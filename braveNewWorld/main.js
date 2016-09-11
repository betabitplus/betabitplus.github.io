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
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = allR[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _i = _step.value;
      _i.innerHTML = randomize(R);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  document.querySelector('.a').innerHTML = randomize(A);
  document.querySelector('.v').innerHTML = randomize(V);

  var allE = document.querySelectorAll('.e');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = allE[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _i2 = _step2.value;
      _i2.innerHTML = randomize(E);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  document.querySelector('.n').innerHTML = randomize(N);

  var allW = document.querySelectorAll('.w');
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = allW[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _i3 = _step3.value;
      _i3.innerHTML = randomize(W);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  document.querySelector('.o').innerHTML = randomize(O);
  document.querySelector('.l').innerHTML = randomize(L);
  document.querySelector('.d').innerHTML = randomize(D);
};

output();

setInterval(function () {
  output();
}, 100);