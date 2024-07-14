window.onload = () => {
    const score = document.getElementById('score');
    const accuracyAvg = document.getElementById('accuracyAvg');
    const gradeAvg = document.getElementById('gradeAvg');
    const ul = document.getElementById('referees');

    setInterval(() => {show(score, accuracyAvg, gradeAvg, ul)}, 1000);
}

function averageArray(stringArray) {
    const numArray = stringArray.map(str => parseInt(str, 10));
    const sumArray = numArray.reduce((i, currentValue) => i + currentValue);
    const avg = sumArray / numArray.length;
    return avg.toFixed(2);
}

function average(number1, number2) {
    return ((parseFloat(number1) + parseFloat(number2)) / 2).toFixed(2);
}

let calculated = false;
function show(score, accuracyAvg, gradeAvg, ul) {
    if (Boolean(localStorage.getItem('show'))) {
        let avgf = 0;
        if (!calculated) {
            const refereesArray = localStorage.getItem("referees").split(',');
            const gradesArray = localStorage.getItem("grades").split(',');
            const accuraciesArray = localStorage.getItem("accuracies").split(',');
        
            const avgGrades = averageArray(gradesArray);
            const avgAccuracies = averageArray(accuraciesArray);
            
            let div = document.createElement('div');
            div.id = "tempReferees";
            for (let index = 0; index < refereesArray.length; index++) {
                const referee = refereesArray[index];
                const grade = gradesArray[index];
                const accuracy = accuraciesArray[index];
                let newReferee = document.createElement('il');
                newReferee.className = 'referee';
                newReferee.textContent = `${referee}`;
                let newGrade = document.createElement('span');
                newGrade.className = 'grade';
                newGrade.textContent = `${grade}`;
                newReferee.appendChild(newGrade);
                let newAcc = document.createElement('span');
                newAcc.className = 'accuracy';
                newAcc.textContent = `${accuracy}`;
                newReferee.appendChild(newAcc);

                div.appendChild(newReferee);
            }
            ul.appendChild(div);

            score.innerHTML = `${average(avgAccuracies, avgGrades)}`;
            accuracyAvg.innerHTML = `${avgAccuracies}`;
            gradeAvg.innerHTML = `${avgGrades}`;
            
            calculated = true;
            //console.log("calculado", avg, sum, grades);
        }
        console.log("foi");
    } else {
        calculated = false;
        const div = document.getElementById("tempReferees");
        if (div) {
          div.remove();  
        }
    
        score.innerHTML = "-";
        accuracyAvg.innerHTML = `-`;
        gradeAvg.innerHTML = `-`;
        console.log('agora não');
    }
};