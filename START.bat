cd gateway
start node REST.js
echo "GATEWAY-gestartet"
cd ..

cd dashboard
start node apiserver.js
echo "DASHBOARD-gestartet"
cd ..

cd mock
start node start.js
echo "MOCKSEVICE-gestartet"
cd ..
