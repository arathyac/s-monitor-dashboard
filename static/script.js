
function randomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}

function updateDashboard() {
    document.getElementById("cpu").innerText = randomValue(0, 100) + "%";
    document.getElementById("memory").innerText = randomValue(20, 90) + "%";
    document.getElementById("disk").innerText = randomValue(30, 95) + "%";

    const now = new Date();
    document.getElementById("time").innerText = now.toLocaleString();
}

updateDashboard();
setInterval(updateDashboard, 3000);
