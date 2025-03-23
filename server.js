const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const filePath = 'D:\\onepercent\\localstorage.txt';

app.post('/save', (req, res) => {
    const { data } = req.body;

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error("Error writing file", err);
            res.status(500).send("Failed to save data");
        } else {
            res.send("Data saved successfully!");
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
