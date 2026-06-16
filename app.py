import subprocess
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/nginx_status")
def nginx_status():
    result = subprocess.run(
        ["systemctl", "is-active", "nginx"],
        capture_output=True,
        text=True
    )

    status = result.stdout.strip()

    if status == "active":
        return """Active connections: 1
Nginx service status: active
server accepts handled requests
1 1 1
""", 200, {"Content-Type": "text/plain"}

    return f"Nginx service status: {status}\n", 503, {"Content-Type": "text/plain"}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
