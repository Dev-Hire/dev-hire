const path = require('path');
const express = require('express');
const cors = require('cors');
const api = require('./src/api.js');
const { basicLogger } = require('./src/utils');
const { PORT } = require('./src/config');
const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(basicLogger);
app.use(express.static('dist'));

// API Routes
app.use('/api', api);

/* 그 외의 경로는 전부 Public 폴더의 경로로 Redirect */
const clientPath = path.resolve(__dirname, 'dist', 'index.html');
app.get('*', (req, res) => res.sendFile(clientPath));

// Mock API 서버 실행
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
