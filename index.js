let inputResult = document.getElementById('result')
let buttonsCalculator = document.querySelectorAll('.btn-calculator')
let buttonClear = document.getElementById('btn-clear')
let SpanPreOperation = document.getElementById('pre-operation')

inputResult.addEventListener('input', calculator)

buttonsCalculator.forEach(buttonCalculator => {
  buttonCalculator.addEventListener('click', calculator)
})

buttonClear.addEventListener('click', () => {
  inputResult.value = ''
  SpanPreOperation.innerHTML = ''
})

function calculator(event) {
  if(lastCharIsOperatorEquals(event)) {
    inputResult.value = targetIsButton(event) ? eval(inputResult.value) : eval(inputResult.value.slice(0, -1))
    SpanPreOperation.innerHTML = ''
  } else {
    if(filterOperationsInInputResult().length > 0 && is_numeric(getLastCharInString(event.currentTarget.value))) {
      SpanPreOperation.innerHTML = targetIsButton(event) ? eval(inputResult.value + event.currentTarget.value) : eval(inputResult.value)
    }

    if(targetIsButton(event)) {
      inputResult.value += event.currentTarget.value
    } else {
      if(inputResult.value.length == 0) {
        SpanPreOperation.innerHTML = ''
      }
    }
  }
}

function lastCharIsOperatorEquals(event) {
  return getLastCharInString(event.currentTarget.value) == '='
}

function getLastCharInString(string) {
  return string.slice(-1)
}

function targetIsButton(event) {
  return event.currentTarget.type == 'button'
}

function filterOperationsInInputResult() {
  return ['+', '-', '/', '*'].filter(operation => inputResult.value.includes(operation))
}

function is_numeric(string){
  return /^\d+$/.test(string);
}