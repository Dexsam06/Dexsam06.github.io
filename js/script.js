let resetLCD = false;
let lcd = null; // displayen
let noComma = true;
let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

for (let i = 0; i < 5; i++) {
    document.write('<div class="square"></div>');
    document.write('<div class="circle"></div>');
    document.write('<div class="triangle"></div>');
}

function randomValues() {
    anime({
        targets: '.square, .circle, .triangle',
        translateX: function () {
            return anime.random(-500, 500);
        },
        translateY: function () {
            return anime.random(-300, 300);
        },
        rotate: function () {
            return anime.random(0, 360);
        },
        scale: function () {
            return anime.random(.2, 2);
        },
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: randomValues,
    });
}


function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
    const buttons = document.getElementsByTagName('button')
    for (let i = 0; i < buttons.length; i++) {
        if (isNaN(buttons[i].innerText)) {
            buttons[i].style.color = "blue";
        }
    }
    randomValues();
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        if (resetLCD) {
            clearLCD();
        }
        addDigit(digit);
        resetLCD = false;
    } else { // Inte en siffertangent, övriga tangenter.
        let operator = e.target.id;
        switch (operator) {
            case "comma":
                addComma();
                break;
            case "enter":
                calculate();
                break;
            case "clear":
                memClear();
                noComma = true;
                break;
            default:
                setOperator(operator);
                memory = lcd.value;
                noComma = true;
                resetLCD = true;
        }
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value += digit;
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (noComma) {
        lcd.value += '.';
        noComma = false;
    }
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    arithmetic = operator;
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    switch (arithmetic) {
        case "add":
            lcd.value = Number(memory) + Number(lcd.value);
            break;
        case "sub":
            lcd.value = Number(memory) - Number(lcd.value);
            break;
        case "mul":
            lcd.value = Number(memory) * Number(lcd.value);
            break;
        case "div":
            lcd.value = Number(memory) / Number(lcd.value);
    }

    resetLCD = false;
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    resetLCD = false;
}

/** Rensar allt, reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
