// space
let s = "&nbsp;&nbsp;";
// line break
let b = "<br>";
// indent
let i = "&nbsp;";

// letters
let B = `******${b}**${s + s + s}**${b}**${s + s + s}**${b}******${b}**${s + s + s}**${b}**${s + s + s}**${b}******`;
let R = `******${b}**${s + s + s}**${b}**${s + s + s}**${b}******${b}**${s}**${b}**${s + s}**${b}**${s + s + s}**`;
let A = `${s + s + s + i}**${s + s + s + i}${b}
         ${s + s + s}***${s + s + s}${b}
         ${s + s}**${s}**${s + s}${b}
         ${s + i}**${s + s}**${s + i}${b}
         ${s}*******${s}${b}
         ${i}**${s + s + s + s + i}**${i}${b}
         **${s + s + s + s + s + s}**`;

let V = `**${s + s + s + s + s + s}**${b}
         ${i}**${s + s + s + s + i}**${i}${b}
         ${s}**${s + s + s}**${s}${b}
         ${s + i}**${s + s}**${s + i}${b}
         ${s + s}**${s}**${s + s}${b}
         ${s + s + s}***${s + s + s}${b}
         ${s + s + s + i}**${s + s + s + i}${b}`;

let E = `*******${b}
         **${b}
         **${b}
         *******${b}
         **${b}
         **${b}
         *******${b}`;

let N = `***${s + s + s}**${b}
         **${i}*${s + s + i}**${b}
         **${s}*${s + s}**${b}
         **${s + i}*${s + i}**${b}
         **${s + s}*${s}**${b}
         **${s + s + i}*${i}**${b}
         **${s + s + s}***${b}`;

let W = `**${s + s + s + s + s}**${s + s + s + s + s}**${b}
         ${i}**${s + s + s + s}***${s + s + s + s}**${b}
         ${s}**${s + s + s}**${i}**${s + s + i}**${b}
         ${s + i}**${s + s}**${s + i}**${s + i}**${b}
         ${s + s}**${s}**${s + s + i}**${i}**${b}
         ${s + s + s}***${s + s + s + s}***${b}
         ${s + s + s + i}**${s + s + s + s + s}**${b}`;

let O = `${s + s + s + i}****${s}${b}
         ${s + s}***${s}***${b}
         ${s}**${s + s + s + s + s}**${b}
         ${i}**${s + s + s + s + s + s}**${b}
         ${s}**${s + s + s + s + s}**${b}
         ${s + s}***${s}***${b}
         ${s + s + s + i}****${s}${b}`;

let L = `**${b}
         **${b}
         **${b}
         **${b}
         **${b}
         **${b}
         *******${b}`;

let D = `*****${b}
         **${s + s + i}**${b}
         **${s + s + s + i}**${b}
         **${s + s + s + s}**${b}
         **${s + s + s + i}**${b}
         **${s + s + i}**${b}
         *****${b}`;

// letter randomizer
let randomize = (letter) => {
  let target = "*";
  let pos = 0;
  let newLetter = "";
  while (true) {
    let foundPos = letter.indexOf(target, pos);
    if (foundPos == -1) break;

    newLetter += letter.slice(pos, foundPos) + `${Math.random() > .5 ? 0 : 1}` + letter.slice(foundPos, 0);
    pos = foundPos + 1;
  }
  return newLetter;
}

// output
let output = () => {
  document.querySelector('.b').innerHTML = randomize(B);

  let allR = document.querySelectorAll('.r');
  for (let i = 0; i < allR.length; i++) allR[i].innerHTML = randomize(R);
  // for (let i of allR) i.innerHTML = randomize(R);

  document.querySelector('.a').innerHTML = randomize(A);
  document.querySelector('.v').innerHTML = randomize(V);

  let allE = document.querySelectorAll('.e');
  for (let i = 0; i < allE.length; i++) allE[i].innerHTML = randomize(E);
  // for (let i of allE) i.innerHTML = randomize(E);

  document.querySelector('.n').innerHTML = randomize(N);

  let allW = document.querySelectorAll('.w');
  for (let i = 0; i < allW.length; i++) allW[i].innerHTML = randomize(W);
  // for (let i of allW) i.innerHTML = randomize(W);

  document.querySelector('.o').innerHTML = randomize(O);
  document.querySelector('.l').innerHTML = randomize(L);
  document.querySelector('.d').innerHTML = randomize(D);
}

output();

setInterval(() => {
  output();
},100);