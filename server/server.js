const path = require('path');
const express = require('express');

var app = express();
const port = process.env.PORT || 3000;

console.log(__dirname);

const publicPath = path.join(__dirname + '/../public');

app.use(express.static(publicPath));


app.get('/', (req, res) => {
    res.sendFile(publicPath + '/index.html');
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app: app
};

