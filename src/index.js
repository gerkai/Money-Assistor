const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;
// Defining an array to work as database
const ads = [
    {title: 'Hello World AGain'},
    {title: 'Lassun ke Sodagar'}
];

// add helmet to enhance the security
app.use(helmet());

// using Bodyparser to parse json bodies into json objects
app.use(bodyParser.json());

// use cors 
app.use(cors());

// addign morgan to log http request
app.use(morgan('combined'));

// endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
})

// listening server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})
