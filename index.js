const buttons = document.querySelectorAll('button');
const clearBtn = document.querySelector('.clear');
const operation = document.getElementById('operation');
const result = document.getElementById('result');
const equal = document.querySelector('.equal');
const removeLast = document.querySelector('.remove');
const plusMinus = document.querySelector('.plus-minus');

let isBlocked = false;
let isDecimal = false;
let isPurcent = false;

function handleClick(e) {
  let n = operation.innerText.length;

  if (n >= 31) {
    operation.classList.remove('long4');
    operation.classList.add('tooLong');
    clearBtn.classList.add('error');
    result.innerHTML = 'Error ' + '&#128517';
    isBlocked = true;
    return;
  }

  if (!isBlocked) {
    operation.innerText += e.target.id;

    if (e.target.id === '.' || e.target.id === '/') {
      isDecimal = true;
      return;
    }

    if (e.target.id === '%') {
      isPurcent = true;
      return;
    }

    if (n >= 16) {
      operation.classList.add('long');

      if (n >= 18) {
        operation.classList.remove('long');
        operation.classList.add('long1');

        if (n >= 20) {
          operation.classList.remove('long1');
          operation.classList.add('long2');

          if (n >= 22) {
            operation.classList.remove('long2');
            operation.classList.add('long3');

            if (n >= 24) {
              operation.classList.remove('long3');
              operation.classList.add('long4');
            }
            return;
          }

          return;
        }
        return;
      }
      return;
    }

    return;
  }
}

function calculate() {
  let calcul = operation.innerText;

  if (calcul.length === 0) {
    result.innerText = '';
    return;
  }

  if (isBlocked) {
    result.innerHTML = 'Error ' + '&#128517';
    return;
  }

  try {
    if (isPurcent || isDecimal) {
      result.innerText = eval(calcul.replace(/%/gi, '/100')).toFixed(2);
      return;
    } else {
      result.innerText = eval(calcul);
    }
  } catch (err) {
    operation.classList.add('error');
    clearBtn.classList.add('error');
    operation.innerText = operation.innerText;
    result.innerHTML = 'Error ' + '&#128517';
    isBlocked = true;
  }
}

function clearAll(lol) {
  operation.innerText = '';
  result.innerText = '';
  clearBtn.classList.remove('error');
  isDecimal = false;
  isBlocked = false;
  isPurcent = false;
  operation.className = '';
  return;
}

function deleteLast(e) {
  if (!isBlocked) {
    operation.innerText = operation.innerText.slice(0, -1);
  }
  return;
}

function plusMinusChange(e) {
  if (!isBlocked) {
    operation.innerText = `-(${operation.innerText})`;
  }
  return;
}

buttons.forEach((button) => {
  button.addEventListener('click', handleClick);
});
equal.addEventListener('click', calculate);
clearBtn.addEventListener('click', clearAll);
removeLast.addEventListener('click', deleteLast);
plusMinus.addEventListener('click', plusMinusChange);

// Thanks...
