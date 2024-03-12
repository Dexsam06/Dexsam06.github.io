/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */
let resetLCD = false;
let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

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
                break;
            default:
                setOperator(operator);
                memory = lcd.value;
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
    lcd.value += '.';

}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator){
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
function memClear(){
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
