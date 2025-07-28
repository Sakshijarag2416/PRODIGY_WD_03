// script.js
let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapTimes = [];

function formatTime(totalMilliseconds) {
    const milliseconds = String(Math.floor((totalMilliseconds % 1000) / 10)).padStart(2, '0'); // Get hundredths of a second
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}:${milliseconds}`;
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    document.getElementById('display').textContent = formatTime(difference);
}

function start() {
    if (!running) {
        // If starting for the first time or after reset/pause
        startTime = new Date().getTime() - (difference || 0); // Correctly resume from where it left off
        timerInterval = setInterval(updateDisplay, 10); // Update every 10 milliseconds for smooth display
        running = true;
    }
}

function pause() {
    clearInterval(timerInterval);
    running = false;
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    difference = 0; // Reset difference
    document.getElementById('display').textContent = "00:00:00:00"; // Show initial display with milliseconds
    document.getElementById('laps').innerHTML = ''; // Clear laps from display
    lapTimes = []; // Clear lap times array
}

function lap() {
    if (running) {
        const lapTime = formatTime(difference); // Use the current total stopwatch time for the lap
        lapTimes.push(lapTime); // Store lap time
        const li = document.createElement('li');
        li.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        document.getElementById('laps').appendChild(li);
        document.getElementById('laps').scrollTop = document.getElementById('laps').scrollHeight; // Scroll to bottom of lap list
    }
}

// Initial display setup when the page loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('display').textContent = "00:00:00:00";
});