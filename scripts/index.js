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
        
        localStorage.setItem('referees', referees);
        localStorage.setItem('grades', grades);
        localStorage.setItem('accuracies', accuracies);
        localStorage.setItem('show', true);
    });

    
};

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
    localStorage.setItem('show', '');   
}