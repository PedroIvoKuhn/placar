window.onload = () => {
    const score = document.getElementById('score');
    const accuracyAvg = document.getElementById('accuracyAvg');
    const gradeAvg = document.getElementById('gradeAvg');
    const div = document.getElementById('referees');

    setInterval(() => {show(score, accuracyAvg, gradeAvg, div)}, 1000);
}

function averageArray(stringArray) {
    const numArray = stringArray.map(str => parseFloat(str, 10));
    const validNumbers = numArray.filter(num => !isNaN(num));
    const sumArray = validNumbers.reduce((i, currentValue) => i + currentValue);
    const avg = sumArray / validNumbers.length;
    return avg.toFixed(2);
}

function sum(number1, number2) {
    return ((parseFloat(number1) + parseFloat(number2))).toFixed(2);
}

let calculated = false;
let isNotShowing = false;
function show(score, accuracyAvg, gradeAvg, div) {
    if (Boolean(localStorage.getItem('show'))) {
        if (!calculated) {
            const refereesArray = localStorage.getItem("referees").split(',');
            const gradesArray = localStorage.getItem("gradesPrecisions").split(',');
            const accuraciesArray = localStorage.getItem("accuracies").split(',');
        
            const avgGrades = averageArray(gradesArray);
            const avgAccuracies = averageArray(accuraciesArray);
            
            let ul = document.createElement('ul');
            ul.id = "tempReferees";
            ul.className = "tempReferees"
            const competitor = document.createElement('il');
            competitor.textContent = localStorage.getItem("competitor");
            competitor.className = 'competitor grid-item';
            ul.appendChild(competitor);
            for (let index = 0; index < refereesArray.length; index++) {
                const referee = refereesArray[index];
                const grade = gradesArray[index];
                const accuracy = accuraciesArray[index];
                let newReferee = document.createElement('il');
                newReferee.className = 'referee';
                let name = document.createElement('p');
                name.className = 'name grid-item';
                name.textContent = `${index+1}`;
                newReferee.appendChild(name);
                let newAcc = document.createElement('p');
                newAcc.className = 'accuracy grid-item';
                newAcc.textContent = `${accuracy}`;
                newReferee.appendChild(newAcc);
                let newGrade = document.createElement('p');
                newGrade.className = 'grade grid-item';
                newGrade.textContent = `${grade}`;
                newReferee.appendChild(newGrade);

                ul.appendChild(newReferee);
            }
            div.appendChild(ul);

            score.innerHTML = `${sum(avgAccuracies, avgGrades)}`;
            accuracyAvg.innerHTML = `${avgAccuracies}`;
            gradeAvg.innerHTML = `${avgGrades}`;

            localStorage.setItem('result', `${avgAccuracies},${avgGrades},${sum(avgAccuracies, avgGrades)}`);
            
            calculated = true;
            isNotShowing = false;
            console.log("foi");
        }
    } else {
        calculated = false;
        const div = document.getElementById("tempReferees");
        if (div) {
          div.remove();  
        }
        if (!isNotShowing) {
            score.innerHTML = "-";
            accuracyAvg.innerHTML = `-`;
            gradeAvg.innerHTML = `-`;
            localStorage.removeItem('result');
            isNotShowing = true;
            console.log('agora não');
        }
    }
};