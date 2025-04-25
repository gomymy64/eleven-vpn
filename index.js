const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/elevenlabs', createProxyMiddleware({
  target: 'https://api.elevenlabs.io',
  changeOrigin: true,
  pathRewrite: { '^/elevenlabs': '' },
  onProxyRes: (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = 'https://macthave.ru';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization';
  }
}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy server running on http://localhost:${port}`));
