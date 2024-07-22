window.onload = () => {
    const form = document.getElementById('form');
    const referee1 = document.getElementById('referee-one');
    const referee2 = document.getElementById('referee-two');
    const referee3 = document.getElementById('referee-three');

    const grade1 = document.getElementById('grade-one');
    const grade2 = document.getElementById('grade-two');
    const grade3 = document.getElementById('grade-three');

    const precision1 = document.getElementById('precision-one');
    const precision2 = document.getElementById('precision-two');
    const precision3 = document.getElementById('precision-three');

    const competitor = document.getElementById('competitor');

    setInterval(() => {result()}, 1000);

    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const referees = referee1.value + ',' + referee2.value + ',' + referee3.value;
        const grades = [convertNumber(grade1.value, false), convertNumber(grade2.value, false), convertNumber(grade3.value, false)];
        if (grades.includes(null)) {
            alert('Insira um numero entre 0 e 6 para a apresentação.');
            return;
        }
        const accuracies = [convertNumber(precision1.value, true), convertNumber(precision2.value, true), convertNumber(precision3.value, true)];
        if (accuracies.includes(null)) {
            alert('Insira um numero entre 0 e 4 para a precisão.');
            return;
        }
        
        document.getElementById("submit").disabled = true;
        document.getElementById("reset").disabled = false;
        localStorage.setItem('referees', referees);
        localStorage.setItem('grades', grades);
        localStorage.setItem('accuracies', accuracies);
        localStorage.setItem('show', true);
        localStorage.setItem('competitor', competitor.value);
    });

    
};

let shown = false
function result() {
    let result = localStorage.getItem('result');
    if (result != null) {
        if (!shown) {        
            const temp = document.getElementById('result');
            result = result.split(',');
            result.forEach(element => {
                const span = document.createElement('span');
                span.id = 'tempResult';
                span.textContent = `${element}`;
                temp.appendChild(span);
            });
            shown = true;
        }
        return
    }
    shown = false;
}

function convertNumber(number, precision) {
    const value = number.replace(',', '.');
    const numValue = parseFloat(value);
    if (precision) {
        if (isNaN(numValue) || numValue < 0 || numValue > 4) {
            return null;
        } else {
            return numValue;
        }
    }
    if (isNaN(numValue) || numValue < 0 || numValue > 6) {
        return null;
    } else {
        return numValue;
    }
}

function resetInputs() {
    document.getElementById('grade-one').value = '';
    document.getElementById('grade-two').value = '';
    document.getElementById('grade-three').value = '';
    document.getElementById('precision-one').value = '';
    document.getElementById('precision-two').value = '';
    document.getElementById('precision-three').value = '';
    document.getElementById('competitor').value = '';
    localStorage.setItem('show', '');
    document.getElementById("submit").disabled = false;
    document.getElementById("reset").disabled = true;
    const p = document.getElementById("result");
    p.innerHTML = "Resultado:";
}

window.addEventListener('beforeunload', (e) =>{
    localStorage.removeItem('referees');
    localStorage.removeItem('grades');
    localStorage.removeItem('accuracies');
    localStorage.removeItem('show');
    localStorage.removeItem('competitor');
})