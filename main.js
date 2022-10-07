
const timer = document.getElementById('timer');
const startStopButton = document.getElementById('startStopButton')
const lapResetButton = document.getElementById('lapResetButton')
const $lapTable = document.getElementById('lapTable')
const lapTimer = document.getElementById('lapTimer')

const stopwatch = { 
    elapsedTime: 0,
    lapElapsedTime:0,
    startTime: 0,
    lapTime: 0,
    intervalId: 0 
}

let isStarted = false
let formatLapTime = 0
let lapCounter = 1
let slowestLap = -1
let fastestLap = Infinity
let lapRow

const padNumber =  (value) => Math.floor(value).toString().padStart(2, '0')

const getFormattedTime = (elapsedTime) => {
    const centiseconds =(elapsedTime % 1000) / 10
    const seconds = (elapsedTime / 1000) % 60
    const minutes =(elapsedTime / (1000 * 60)) % 60
    return [centiseconds, seconds, minutes].map(padNumber) 
}

const runTimer = () => {
    startStopButton.innerText = 'Stop'
    lapResetButton.innerText = 'Lap'
    isStarted = true
    startTimer()
}

const stopTimer = () => {

startStopButton.innerText = 'Start'
lapResetButton.innerText = 'Reset'
isStarted = false
clearInterval(stopwatch.intervalId)
}

startStopButton.onclick = () =>  isStarted ? stopTimer() : runTimer() 

lapResetButton.onclick = () => { 
if (!isStarted){
    lapResetButton.innerText = 'Lap'
    isStarted = false
    resetTimer()
}
else if (lapResetButton.innerText == 'Lap'){
    getLap()
    compareLap()
    stopwatch.lapTime = Date.now()
}
}

const getLap = () => {
    lapRow = $lapTable.insertRow(0)
    let lapNumber = lapRow.insertCell(0)
    let lapTime = lapRow.insertCell(1)

    lapNumber.innerText = `Lap ${lapCounter++}`
    lapTime.innerText = ` ${formatLapTime[2]}:${formatLapTime[1]}.${formatLapTime[0]}`

}
// create a row for the lapTimer
const firstLap = () => {

}

const compareLap = () => {
if (stopwatch.lapElapsedTime < fastestLap) {
    fastestLap = stopwatch.lapElapsedTime
    // lapRow.classList.add('fastestLap')
    lapRow.style.color = 'green'
}
if (stopwatch.lapElapsedTime > slowestLap) {
    slowestLap = stopwatch.lapElapsedTime
    // lapRow.classList.add('slowestLap')
    lapRow.style.color = 'red'
}
}

const startTimer = () => {
    stopwatch.startTime = Date.now() - stopwatch.elapsedTime
    stopwatch.lapTime = Date.now() - stopwatch.lapElapsedTime

    stopwatch.intervalId = setInterval(() => { 
    
        stopwatch.elapsedTime = Date.now() - stopwatch.startTime 
        stopwatch.lapElapsedTime = Date.now() - stopwatch.lapTime 
        const formatTime = getFormattedTime(stopwatch.elapsedTime)
        formatLapTime = getFormattedTime(stopwatch.lapElapsedTime)

        timer.innerText =`${formatTime[2]}:${formatTime[1]}.${formatTime[0]}` 
        lapTimer.innerText =`${formatLapTime[2]}:${formatLapTime[1]}.${formatLapTime[0]}`
}, 10)
}

const resetTimer = () => {
    stopwatch.elapsedTime = 0
    stopwatch.lapElapsedTime = 0
    timer.innerText = '00:00.00'
    lapTimer.innerText = '' 
    $lapTable.innerText = ''
    lapCounter = 1
}
