document.addEventListener("DOMContentLoaded", setup)


const minValue = 180
const maxValue = 300

function setup() {
    document.getElementById("update").onclick = update
    update()
}


function update() {
    const container = document.getElementById("container")
    container.innerHTML = ""

    const data = generateData()

    const userDataElement = document.createElement('div')
    userDataElement.innerText = `Данные для пользователя: [${data.join(', ')}]`
    container.appendChild(userDataElement)


    const cleanedData = cleanData(data, minValue, maxValue)

    const cleanDataElement = document.createElement('div')
    cleanDataElement.innerText = `Данные без выбросов: [${cleanedData.join(', ')}]`
    container.appendChild(cleanDataElement)

    const answersElement = document.createElement('div')
    answersElement.innerText = `Среднее: ${getAverage(cleanedData)}, медиана: ${getMean(cleanedData)}`
    container.appendChild(answersElement)

}
function generateData(){

    // Сколько будет нормальных значений - нужно нечетное число
    let usual_values_count = randIntInRange(4, 6)*2 + 1
    // Сколько будет выбросов - нужно четное число
    const extra_values_count = randIntInRange(1, 2)

    const values = []
    // Записываем нормальные значения
    for (let i = 0; i < usual_values_count; i ++){
        values.push(randIntInRange(minValue, maxValue))
    }
    // Записываем выбросы
    for (let i = 0; i < extra_values_count; i ++){
        // Равновероятно выброс или маленький, или большой
        if (Math.random() > 0.5){
            values.push(randIntInRange(1, 10))
        } else
        {
            values.push(randIntInRange(1000, 2000))
        }
    }
    console.log(values.length)
    // Перемешиваем значения
    return shuffleArray(values)
}

function randIntInRange(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

// Мы-то знаем, что нормальные числа лежат в диапазоне 180-300
// А вот участникам придется догадаться
function cleanData(array, min, max){
    return array.filter(x=>{
        return x >= min && x <= max
    })
}

//Среднее - оно и есть среднее
function getAverage(array){
    const sum = array.reduce((a, b) => a + b, 0);
    //С округлением вниз
    return Math.ceil(sum / array.length || 0) ;
}
// Медиана, если мы уверены, что в массиве нечетное число элементов
function getMean(array){
    const sorted = array.sort((a,b) => {return a-b})
    return sorted[Math.ceil(sorted.length/2)]
}