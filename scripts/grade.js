function getNumArbitros() {
    const urlParams = new URLSearchParams(window.location.search);
    const num = parseInt(urlParams.get('arbitros'));
    return isNaN(num) ? 3 : num;
}

function generateInputs(numArbitros) {
    const form = document.getElementById('form');

    for (let index = 0; index < numArbitros; index++) {
        const divArbitro = document.createElement('div');
        divArbitro.className = `grade`;

        const divPrecision = document.createElement('div');
            const labelPrecision = document.createElement('label');
            const inputPrecision = document.createElement('input');
            inputPrecision.id = `precision`;
            inputPrecision.type = 'text';
            inputPrecision.name = 'precision';
            labelPrecision.htmlFor = 'precision';
            labelPrecision.innerText = `Precisão`;
            divPrecision.appendChild(labelPrecision);
            divPrecision.appendChild(inputPrecision);
        divArbitro.appendChild(divPrecision);

        const divApresentation = document.createElement('div');
            const labelApresentation = document.createElement('label');
            const inputApresentation = document.createElement('input');
            inputApresentation.id = `apresentation`;
            inputApresentation.type = 'text';
            inputApresentation.name = 'apresentation';
            labelApresentation.htmlFor = 'apresentation';
            labelApresentation.innerText = `Apresentação`;
            divApresentation.appendChild(labelApresentation);
            divApresentation.appendChild(inputApresentation);
        divArbitro.appendChild(divApresentation);

        form.appendChild(divArbitro);
    }
}

function maxAndMin(array) {
    const cleanArray = array.filter(number => !isNaN(number));
    const max = cleanArray.reduce((previous, current) => Math.max(previous, current));
    const min = cleanArray.reduce((previous, current) => Math.min(previous, current));
    
    return [array.findIndex(num => num === max), array.findIndex(num => num === min)];
}

window.onload= () => {
    const numArbitros = getNumArbitros();
    generateInputs(numArbitros);
    localStorage.setItem(`arbitros`, numArbitros);

    const form = document.getElementById('form');
    const precisions = document.querySelectorAll('#precision');
    const apresentations = document.querySelectorAll('#apresentation');
    const competitor = document.getElementById('competitor');
    let gradesPrecisions = [];
    let accuracyApresentation = []

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('competitor', competitor.value);

        precisions.forEach((input) => {
            let grade = parseFloat(input.value);

            if (!isNaN(grade)){
                gradesPrecisions.push(grade);
            } else {
                gradesPrecisions.push('-');
            }
        });

        apresentations.forEach((input) => {
            let grade = parseFloat(input.value);

            if (!isNaN(grade)){
                accuracyApresentation.push(grade);
            } else {
                accuracyApresentation.push('-');
            }
        });

        if (numArbitros < 4) {
            localStorage.setItem('gradesPrecision', accuracyApresentation);
            localStorage.setItem('gradesPrecision', gradesPrecisions);
            accuracyApresentation = [];
            gradesPrecisions = [];
            return;
        }

        const precisionMaxAndMin = maxAndMin(gradesPrecisions);
        gradesPrecisions.splice(precisionMaxAndMin[0], 1, "X");
        gradesPrecisions.splice(precisionMaxAndMin[1], 1, "X");
        const apresentationMaxAndMin = maxAndMin(accuracyApresentation);
        accuracyApresentation.splice(apresentationMaxAndMin[0], 1, "X");
        accuracyApresentation.splice(apresentationMaxAndMin[1], 1, "X");
        
        localStorage.setItem('gradesPrecision', gradesPrecisions);
        localStorage.setItem('accuracyApresentation', accuracyApresentation);
        gradesPrecisions = [];
        accuracyApresentation = [];
    })    
}

function resetInputs() {
    localStorage.setItem('gradesPrecision', '');
    localStorage.setItem('accuracyApresentation', '');
    localStorage.setItem('competitor', '');
    const p = document.getElementById("result");
    p.innerHTML = "Resultado:";
}
