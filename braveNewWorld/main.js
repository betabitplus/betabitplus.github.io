let s = "&nbsp;&nbsp;";
let b = "<br>";
let B = `******${b}**${s + s + s}**${b}**${s + s + s}**${b}******${b}**${s + s + s}**${b}**${s + s + s}**${b}******`;
let R = `******${b}**${s + s + s}**${b}**${s + s + s}**${b}******${b}**${s}**${b}**${s + s}**${b}**${s + s + s}**`;

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

setInterval(() => {
  document.querySelector('.b').innerHTML = randomize(B);
},200);
document.querySelector('.r').innerHTML = R;