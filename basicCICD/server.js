import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (frontend)
app.use(express.static('.'));

// Backend API endpoint
app.get('/api/message', (req, res) => {
  res.json({
    message: "Hello from the backend!",
    timestamp: new Date().toISOString()
  });
});

// Backend API endpoint that processes data
app.post('/api/echo', (req, res) => {
  const { text } = req.body;
  res.json({
    original: text,
    echoed: `You said: "${text}"`,
    processed: true
  });
  console.log(`Processed: ${text}`);
});

// Serve the main website
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Website: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/message`);
});