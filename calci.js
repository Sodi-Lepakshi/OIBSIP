document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const historyContent = document.getElementById('historyContent');
    let currentCalculation = '';
    let history = [];

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleButtonClick(value);
        });
    });

    function handleButtonClick(value) {
        if (value === 'AC') {
            clearCalculation();
        } else if (value === 'DEL') {
            deleteLastCharacter();
        } else if (value === '=') {
            calculateResult();
        } else {
            appendToCalculation(value);
        }
    }

    function appendToCalculation(value) {
        if (currentCalculation === '0') {
            currentCalculation = value;
        } else {
            currentCalculation += value;
        }
        display.textContent = currentCalculation;
    }

    function clearCalculation() {
        currentCalculation = '0';
        display.textContent = currentCalculation;
    }

    function deleteLastCharacter() {
        if (currentCalculation.length > 1) {
            currentCalculation = currentCalculation.slice(0, -1);
        } else {
            currentCalculation = '0';
        }
        display.textContent = currentCalculation;
    }

    function calculateResult() {
        try {
            const result = eval(currentCalculation);
            display.textContent = result;
            history.push(`${currentCalculation} = ${result}`);
            updateHistory();
            currentCalculation = result.toString();
        } catch (e) {
            display.textContent = 'Error';
            currentCalculation = '0';
        }
    }

    function updateHistory() {
        historyContent.innerHTML = history.map(entry => `<div>${entry}</div>`).join('');
    }
});
