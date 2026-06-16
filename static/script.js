function getRandomUsage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateDashboard() {
  const cpu = getRandomUsage(20, 85);
  const memory = getRandomUsage(30, 90);
  const disk = getRandomUsage(40, 95);

  document.getElementById("cpuValue").textContent = cpu + "%";
  document.getElementById("memoryValue").textContent = memory + "%";
  document.getElementById("diskValue").textContent = disk + "%";

  document.getElementById("cpuBar").style.width = cpu + "%";
  document.getElementById("memoryBar").style.width = memory + "%";
  document.getElementById("diskBar").style.width = disk + "%";

  document.getElementById("lastUpdated").textContent = new Date().toLocaleTimeString();
}

updateDashboard();
setInterval(updateDashboard, 3000);
