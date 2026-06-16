from flask import Flask, render_template, jsonify
import psutil
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/stats")
def stats():
    cpu_usage = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()

    return jsonify({
        "cpu": cpu_usage,
        "memory": memory.percent,
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
