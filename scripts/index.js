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
        const grades = [grade1.value, grade2.value, grade3.value];
        const accuracies = [precision1.value, precision2.value, precision3.value];
        
        localStorage.setItem('referees', referees);
        localStorage.setItem('grades', grades);
        localStorage.setItem('accuracies', accuracies);
        localStorage.setItem('show', true);
    });

    
};

function resetInputs() {
    document.getElementById('grade-one').value = '';
    document.getElementById('grade-two').value = '';
    document.getElementById('grade-three').value = '';
    document.getElementById('precision-one').value = '';
    document.getElementById('precision-two').value = '';
    document.getElementById('precision-three').value = '';
    localStorage.setItem('show', '');   
}