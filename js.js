//'use strict';

var numbersBtn = document.querySelectorAll('.number'),
    operationsBtn = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    clearsBtn = document.querySelectorAll('.clear'),
    resultBtn = document.getElementById('e'),
    display =  document.getElementById('display'),
    memoryCurrentNumber = 0,
    memoryNewNumber = false,
    memoryPendingOperation = '';



// memoryCurrentNumber - временное хранение числа
// memoryNewNumber - ввели мы новое число, или нет.
// memoryPendingOperation - храним несколько операций

// Обработчики событий
// при нажатии на номер, +-*/ отправляем в функцию обработчика
for (var i = 0; i < numbersBtn.length; i++) {
    var number = numbersBtn[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.value);
    });
}

for (var i = 0; i < operationsBtn.length; i++) {
    var operation = operationsBtn[i];
    operation.addEventListener('click', function (e) {
        // если например button
        console.log(e.target.textContent);
        console.log(operation.value);
        operations(e.target.value);
    });
}
// удалить последний эл или всю строку
for (var i = 0; i < clearsBtn.length; i++) {
    var clear = clearsBtn[i];
    clear.addEventListener('click', function (e) {
        // id кнопки на которую нажали
        clears(e.srcElement.id);
    });
}

decimalBtn.addEventListener('click', decimal);
resultBtn.addEventListener('click', operations);

// Функции работы
function numberPress(number) {
    // вводим новые данные, если тру, перезаписываем инпут, и снова ставит фолс
    if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else {
        // если новыйх данных нет, записываем 0, или добавляем следующие числа
        if (display.value === '0' ) {
            display.value = number;
        } else {
            display.value += number;
        }
    }

    // console.log('click num ' + number);
}

function operations(symbol) {
    // храним то что уже есть в инпуте, и потом проводить с ним операции и новым числом
    var localOperationMemory = display.value;

    if (memoryNewNumber && memoryPendingOperation !== '=') {
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;

        if (memoryPendingOperation === '+') {
            memoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '/') {
            memoryCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            memoryCurrentNumber = parseFloat(localOperationMemory);
        }

        display.value = memoryCurrentNumber;
        memoryPendingOperation = symbol;
    }


    console.log('click oper ' + symbol);
}

// point
function decimal() {
    // перед нажатие сохраняем уже имеющееся значения инпута
    var localDecimalMemory = display.value;

    if (memoryNewNumber) {
        localDecimalMemory = '0.';
        memoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }

    display.value = localDecimalMemory;
}

function clears(id) {
    console.log('click ' + id + '!');
}