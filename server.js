const express = require('express');
const app = express();
const path = require('path');

const public = path.join(__dirname, 'public');
app.use(express.static(public));

app.get('/', (req, res) => res.sendFile(public + '/index.html'));

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Example app listening on port ' + port));