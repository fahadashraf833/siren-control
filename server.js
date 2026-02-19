const express = require('express');
const app = express();

let sirenDuration = 0; // milliseconds

app.use(express.json());
app.use(express.static("public"));

// Trigger endpoint from website
app.get('/trigger', (req, res) => {
    const time = parseInt(req.query.time) || 500;
    sirenDuration = time;
    res.send("Siren scheduled for " + sirenDuration + " ms");
});

// ESP32 checks this endpoint
app.get('/status', (req, res) => {
    res.json({ duration: sirenDuration });
    sirenDuration = 0; // reset after sending
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
