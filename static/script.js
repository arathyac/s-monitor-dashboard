async function getServerStats() {
    try {
        const response = await fetch("/api/stats");
        const data = await response.json();

        document.getElementById("cpu").innerText = data.cpu + "%";
        document.getElementById("memory").innerText = data.memory + "%";
        document.getElementById("time").innerText = data.time;
    } catch (error) {
        document.getElementById("cpu").innerText = "Error";
        document.getElementById("memory").innerText = "Error";
        document.getElementById("time").innerText = "Unable to load data";
    }
}

getServerStats();
setInterval(getServerStats, 3000);
