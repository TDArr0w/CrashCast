sudo git pull
sudo npm install
sudo npm run build

sudo npm run dev &
sudo tail -f /etc/httpd/logs/crashcast-access.log /etc/httpd/logs/crashcast-error.log
