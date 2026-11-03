/**
 * JIYYAD TOOLS - Send OTP (Secure Proxy)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = 'N8bqKDxz2g5vYpdw';
const OTP_URL = 'https://api.jerexd.my.id/api/tools/spamotp';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/sendotp', async (req, res) => {
  try {
    const { nomor } = req.body;
    if (!nomor) return res.status(400).json({ status: false, message: 'Nomor wajib diisi' });

    const response = await axios.post(`${OTP_URL}?apikey=${API_KEY}`, { nomor }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000,
      validateStatus: () => true
    });

    const data = response.data;
    if (data && typeof data === 'object') delete data.creator;

    return res.status(response.status).json(data);
  } catch (err) {
    console.error('[SendOTP]', err.message);
    return res.status(500).json({ status: false, message: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ⚡ JIYYAD TOOLS — Send OTP`);
  console.log(`  ➜  Local:   http://localhost:${PORT}\n`);
});
