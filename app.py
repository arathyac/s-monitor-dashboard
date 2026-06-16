import psutil
from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/stats")
def stats():
    return jsonify({
        "cpu": psutil.cpu_percent(interval=1),
        "memory": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage("/").percent
    })

@app.route("/nginx_status")
def nginx_status():
    return "Nginx service status: active\n", 200, {"Content-Type": "text/plain"}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
