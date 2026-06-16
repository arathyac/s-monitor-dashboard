function randomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}

function updateDashboard() {
    document.getElementById("cpu").innerText = randomValue(1, 80) + "%";
    document.getElementById("memory").innerText = randomValue(20, 90) + "%";
    document.getElementById("disk").innerText = randomValue(30, 95) + "%";

    const now = new Date();
    document.getElementById("time").innerText = now.toLocaleString();
}

async function checkNginxStatus() {
    const status = document.getElementById("nginxStatus");
    const details = document.getElementById("nginxDetails");

    try {
        const response = await fetch("/nginx_status", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Nginx status not available");
        }

        const data = await response.text();

        status.innerText = "Running";
        status.classList.remove("offline");
        status.classList.add("online");

        details.innerText = data.split("\n")[0];
    } catch (error) {
        status.innerText = "Not Available";
        status.classList.remove("online");
        status.classList.add("offline");

        details.innerText = "Enable /nginx_status in Nginx";
    }
}

updateDashboard();
checkNginxStatus();

setInterval(updateDashboard, 3000);
setInterval(checkNginxStatus, 5000);
