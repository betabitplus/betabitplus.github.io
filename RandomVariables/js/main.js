// A set of arithmetic operations
let methods = {
  "-": (a, b) => a - b,
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b
};

function calculator(expression) {
  let exp = expression.split(' '); // Converting expression
                                   // string to array type

  // Converting numbers to type float
  exp.forEach((elem, i) => {
    if (elem in methods === false) exp[i] = parseFloat(elem);
  });

  // Perform multiplying and dividing
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === "*" || exp[i] === "/") { // detect operation
      exp[i - 1] = methods[exp[i]](exp[i - 1], exp[i + 1]);
      exp.splice(i, 2);
      i -= 2;
    }
  }

  // Perform addition and subtraction
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === "+" || exp[i] === "-") { // detect operation
      exp[i - 1] = methods[exp[i]](exp[i - 1], exp[i + 1]);
      exp.splice(i, 2);
      i -= 2;
    }
  }

  return exp[0];
}

function initialMoment(series, power, name) {
  let res = 0, ans = `M(${name}<sup><small>${(power - 1) ? power : ""}</small></sup>) = `;

  for (let i = 1; i < series[0].length - 1; i++) {

    ans += `${+Math.pow(series[0][i], power).toFixed(4)} * ${series[1][i]} + `;
    res += Math.pow(series[0][i], power) * series[1][i];

  }

  ans = ans.slice(0, -2);
  ans += ` = <b>${+res.toFixed(4)}</b>.`;

  return {decision: ans, answer: +res.toFixed(4)};
}

function dispersion(series, name) {
  let res = 0, ans = `D(${name}) = `;

  res = +(initialMoment(series, 2, name).answer - initialMoment(series, 1, name).answer ** 2).toFixed(4);

  ans += `M(${name}<sup><small>2</small></sup>) - M(${name})<sup><small>2</small></sup> = `;
  ans += `${initialMoment(series, 2, name).answer}
          - ${+Math.pow(initialMoment(series, 1, name).answer, 2).toFixed(4)} = <b>${res}</b>.`;

  return {decision: ans, answer: +res.toFixed(4)};
}

function deviation(series, name) {
  let res = 0, ans = `σ(${name}) = `;

  res = +Math.sqrt(dispersion(series, name).answer).toFixed(4);
  ans += `<b>${res}</b>.`;

  return {decision: ans, answer: +res.toFixed(4)};
}

function correlation(table, Mx, My) {
  let res = 0, ans = `μ<sub>xy</sub> = `;

  for (let i = 1; i < table.children.length - 1; i++) {

    for (let j = 1; j < table.children[0].children.length - 1; j++) {

      ans += `(${+table.children[i].children[0].innerHTML} - ${Mx}) * (${+table.children[0].children[j].innerHTML} - ${My}) * ${+table.children[i].children[j].innerHTML} + `;
      res += (+table.children[i].children[0].innerHTML - Mx) * (+table.children[0].children[j].innerHTML - My) * +table.children[i].children[j].innerHTML;

    }

  }

  ans = ans.slice(0, -2);
  ans += ` = <b>${+res.toFixed(4)}</b>.`;

  return {decision: ans, answer: +res.toFixed(4)};
}

let doc = document,
    inputExpression = doc.querySelector('.input-expression'),
    inputResult = doc.querySelector('.input-result'),
    inputKeyboard = doc.querySelector('.input-keyboard'),
    destrTable = doc.querySelector('.distribution-table tbody'),
    resultBur = doc.querySelector('.result-bar'),
    information = resultBur.querySelector('.information'),
    isTyping = false,
    isCalculated = false,
    activeCell = doc.querySelector('.distribution-table tr th').nextElementSibling;

console.log(+destrTable.children[1].children[1].innerHTML);

doc.querySelector('.exit').addEventListener('click', function(e) {
  resultBur.classList.remove('active');
  information.innerHTML = "";

});

doc.querySelector('.get-answer').addEventListener('click', function(e) {

  resultBur.classList.add('active');

  let Ysum = 0, Xsum = 0,
      correlationMoment = 0,
      isCorrect = true,
      Yvalues = '', Yprobabilities = '',
      Xvalues = '', Xprobabilities = '',
      Y = [['Y'], ['p']],
      X = [['X'], ['p']];

  // Check that the table is full
  for (let i = 0; i < destrTable.children.length - 1; i++)
    for (let j = 0; j < destrTable.children[0].children.length - 1; j++)
      if (!destrTable.children[i].children[j].innerHTML) isCorrect = false;

  if (isCorrect) {

    // Calculate probabilities for components
    for (let i = 1; i < destrTable.children.length - 1; i++) {

      for (let j = 1; j < destrTable.children[0].children.length - 1; j++) {

        Xsum += +destrTable.children[i].children[j].innerHTML;

      }

      X[1].push(+Xsum.toFixed(2));
      Xsum = 0;

    }

    for (let j = 1; j < destrTable.children[0].children.length - 1; j++) {
    
      for (let i = 1; i < destrTable.children.length - 1; i++) {

        Ysum += +destrTable.children[i].children[j].innerHTML;

      }

      Y[1].push(+Ysum.toFixed(2));
      Ysum = 0;

    }

    // Output Y component
    information.insertAdjacentHTML("beforeEnd", `<p>Закон распределения компоненты Y:</p>`);
    for (let i = 0; i < Y[1].length; i++) {

      Y[0].push(+destrTable.children[0].children[i + 1].innerHTML);

      Yvalues += `<th>${Y[0][i]}</th>`;
      Yprobabilities += `<th>${Y[1][i]}</th>`;

    }

    information.insertAdjacentHTML("beforeEnd", `<table><tr>${Yvalues}</tr><tr>${Yprobabilities}</tr></table>`);

    // Output X component
    information.insertAdjacentHTML("beforeEnd", `<hr><p>Закон распределения компоненты Х:</p>`);
    for (let i = 0; i < X[1].length; i++) {

      X[0].push(+destrTable.children[i + 1].children[0].innerHTML);

      Xvalues += `<th>${X[0][i]}</th>`;
      Xprobabilities += `<th>${X[1][i]}</th>`;

    }

    information.insertAdjacentHTML("beforeEnd", `<table><tr>${Xvalues}</tr><tr>${Xprobabilities}</tr></table>`);

    // the mathematical expectation of components
    information.insertAdjacentHTML("beforeEnd", `<hr><p>Математическое ожидание компонент Y и X:<br></p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>${initialMoment(Y, 1, "Y").decision}</p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>${initialMoment(X, 1, "X").decision}</p>`);

    // expectation of components squared
    information.insertAdjacentHTML("beforeEnd", `<hr><p>Квадрат Математического ожидания компонент Y и X:<br></p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>${initialMoment(Y, 2, "Y").decision}</p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>${initialMoment(X, 2, "X").decision}</p>`);

    // variance of components
    information.insertAdjacentHTML("beforeEnd", `<hr><p>Дисперсия компонент Y и X:<br></p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>${dispersion(Y, "Y").decision}</p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>${dispersion(X, "X").decision}</p>`);

    // standard deviation of components
    information.insertAdjacentHTML("beforeEnd", `<hr><p>Среднее квадратическое отклонение компонент Y и X:<br></p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>${deviation(Y, "Y").decision}</p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>${deviation(X, "X").decision}</p>`);

    // moment correlation
    information.insertAdjacentHTML("beforeEnd", `<hr><p>Корреляционный момент:<br></p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>${correlation(destrTable, initialMoment(X, 1, "X").answer, initialMoment(Y, 1, "Y").answer).decision}</p>`);

    // correlation coefficient
    information.insertAdjacentHTML("beforeEnd", `<hr><p>Коэффициент корреляции:<br></p>`);
    information.insertAdjacentHTML("beforeEnd", `<p>r<sub>xy</sub> = <b>${+(correlation(destrTable, initialMoment(X, 1, "X").answer, initialMoment(Y, 1, "Y").answer).answer/deviation(X, "X").answer/deviation(Y, "Y").answer).toFixed(4)}</b></p>`);

  } else {

    information.insertAdjacentHTML("beforeEnd", `<p>Все ячейки (кроме границ) должны быть заполнеными!!!</p>`);

  }

});

doc.querySelector('.key-next').addEventListener('click', function(e) {

  if (activeCell === activeCell.parentElement.lastElementChild) {

    for (let i = 0; i < destrTable.children.length; i++) {
      destrTable.children[i].insertAdjacentHTML("beforeEnd", "<th></th>");
    }

  }

  if (destrTable.lastElementChild === activeCell.parentElement) {

    destrTable.insertAdjacentHTML("beforeEnd", "<tr></tr>");

    for (let i = 0; i < activeCell.parentElement.children.length; i++) {
      destrTable.lastElementChild.insertAdjacentHTML("beforeEnd", "<th></th>");
    }

  }

  // if (inputResult.innerHTML != "0") {
  activeCell.classList.remove('active');
  activeCell.innerHTML = inputResult.innerHTML;
  activeCell = activeCell.nextElementSibling;
  activeCell.classList.add('active');
  // }
  // isTyping = true;

  inputResult.innerHTML = (activeCell.innerHTML) ? activeCell.innerHTML : 0;


});

destrTable.addEventListener('click', function(e) {
  let target = e.target;

  if (target.tagName === 'TH') {

    // is not equal to the first cell
    if (target !== doc.querySelector('.distribution-table tr th')) {

      activeCell.classList.remove('active');
      activeCell = target;
      activeCell.classList.add('active');
      inputExpression.innerHTML = "";
      inputResult.innerHTML = (target.innerHTML) ? target.innerHTML : 0;
      // isTyping = true;

    }

  }

});

inputKeyboard.addEventListener('click', function(e) {
  let target = e.target,
      input = inputExpression.innerHTML,
      operand = inputResult.innerHTML;

  if (target.classList.contains('key')) {

    if (target.dataset.type === 'operation') {
      switch (target.dataset.action) {
        case 'CE':
        inputResult.innerHTML = 0;
        break;
        case 'C':
        inputExpression.innerHTML = "";
        inputResult.innerHTML = 0;
        break;
        case 'D':
        inputResult.innerHTML = (operand.length > 1) ? operand.slice(0, -1) : 0;
        break;
        case '+/-':
        inputResult.innerHTML *= -1;
        break;
        case '=':
        if (inputExpression.innerHTML) {

          inputExpression.innerHTML += operand;
          inputResult.innerHTML = calculator(inputExpression.innerHTML);
          inputExpression.innerHTML = "";
          activeCell.innerHTML = inputResult.innerHTML;

          isTyping = true;
          isCalculated = true;

          if (activeCell === activeCell.parentElement.lastElementChild) {

            for (let i = 0; i < destrTable.children.length; i++) {
              destrTable.children[i].insertAdjacentHTML("beforeEnd", "<th></th>");
            }

          }

          if (destrTable.lastElementChild === activeCell.parentElement) {

            destrTable.insertAdjacentHTML("beforeEnd", "<tr></tr>");

            for (let i = 0; i < activeCell.parentElement.children.length; i++) {
              destrTable.lastElementChild.insertAdjacentHTML("beforeEnd", "<th></th>");
            }

          }

        }
        break;
        case '.':
        if (isTyping) {
          inputResult.innerHTML = '0.';
          isTyping = false;
        }
        else inputResult.innerHTML += (operand.indexOf('.') === -1) ? '.' : "";
        break;
      }
    } else if (target.dataset.type === 'value') {

      if (operand !== '0' && !isTyping) {
        inputResult.innerHTML += target.dataset.action;
      }
      else {
        inputResult.innerHTML = target.dataset.action;
        isTyping = false;
      }

    } else if (target.dataset.type === 'method') {

      if (!isTyping || isCalculated) {
        inputExpression.innerHTML += operand;
        inputResult.innerHTML = calculator(inputExpression.innerHTML);
      }

      input = inputExpression.innerHTML;
      isTyping = true;

      if (input[input.length - 2] in methods)
        inputExpression.innerHTML = input.slice(0, -3) + target.dataset.action;
      else inputExpression.innerHTML += target.dataset.action;

    }
  }

});
