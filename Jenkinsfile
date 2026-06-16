pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    python3 -m venv venv
                    ./venv/bin/pip install --upgrade pip
                    ./venv/bin/pip install -r requirements.txt
                '''
            }
        }

        stage('Test Application') {
            steps {
                sh '''
                    ./venv/bin/python -m py_compile app.py
                    ./venv/bin/python - <<EOF
from app import app
client = app.test_client()
response = client.get("/api/stats")
assert response.status_code == 200
print("Test passed successfully")
EOF
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    APP_DIR="/opt/server-monitor-dashboard"

                    sudo mkdir -p $APP_DIR
                    sudo rsync -av --delete --exclude ".git" --exclude "venv" ./ $APP_DIR/

                    sudo python3 -m venv $APP_DIR/venv
                    sudo $APP_DIR/venv/bin/pip install --upgrade pip
                    sudo $APP_DIR/venv/bin/pip install -r $APP_DIR/requirements.txt

                    sudo bash -c 'cat > /etc/systemd/system/server-monitor-dashboard.service' <<SERVICE
[Unit]
Description=Server Monitoring Dashboard
After=network.target

[Service]
WorkingDirectory=/opt/server-monitor-dashboard
ExecStart=/opt/server-monitor-dashboard/venv/bin/gunicorn --workers 2 --bind unix:/run/server-monitor-dashboard.sock app:app
Restart=always
User=root
Group=www-data

[Install]
WantedBy=multi-user.target
SERVICE

                    sudo systemctl daemon-reload
                    sudo systemctl enable server-monitor-dashboard
                    sudo systemctl restart server-monitor-dashboard

                    sudo bash -c 'cat > /etc/nginx/sites-available/server-monitor-dashboard' <<NGINX
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://unix:/run/server-monitor-dashboard.sock;
        proxy_set_header Host \\$host;
        proxy_set_header X-Real-IP \\$remote_addr;
        proxy_set_header X-Forwarded-For \\$proxy_add_x_forwarded_for;
    }
}
NGINX

                    sudo ln -sf /etc/nginx/sites-available/server-monitor-dashboard /etc/nginx/sites-enabled/server-monitor-dashboard
                    sudo rm -f /etc/nginx/sites-enabled/default

                    sudo nginx -t
                    sudo systemctl restart nginx
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful. Dashboard is running on port 80.'
        }
        failure {
            echo 'Deployment failed. Check console output.'
        }
    }
}     
