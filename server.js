const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;
const DIR = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let filePath = decodeURIComponent(req.url === '/' ? '/차량견적서A.html' : req.url);
  filePath = path.join(DIR, filePath);

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const nets = os.networkInterfaces();
  let localIP = '';
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        localIP = net.address;
        break;
      }
    }
    if (localIP) break;
  }

  console.log('');
  console.log('===========================================');
  console.log('  CARPANG 견적서 서버가 시작되었습니다!');
  console.log('===========================================');
  console.log('');
  console.log('  PC에서 접속:');
  console.log(`    http://localhost:${PORT}`);
  console.log('');
  console.log('  태블릿에서 접속 (같은 Wi-Fi 필요):');
  console.log(`    http://${localIP}:${PORT}`);
  console.log('');
  console.log('  태블릿에서 앱으로 설치:');
  console.log('    1. 위 주소를 Chrome으로 접속');
  console.log('    2. 메뉴(⋮) → "홈 화면에 추가"');
  console.log('    3. 앱처럼 실행됩니다!');
  console.log('');
  console.log('  종료: Ctrl+C');
  console.log('===========================================');
});
