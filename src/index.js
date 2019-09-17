const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwtRSA = require('jwks-rsa');
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds, deleteAd, updateAd} = require('./database/ads');

const app = express();
const PORT = process.env.PORT || 8080;
// Defining an array to work as database
// const ads = [
//     {title: 'Hello World AGain'},
//     {title: 'Lassun ke Sodagar'}
// ];

// add helmet to enhance the security
app.use(helmet());

// using Bodyparser to parse json bodies into json objects
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// use cors 
app.use(cors());

// addign morgan to log http request
app.use(morgan('combined'));


// endpoint to return all ads
app.get('/', async (req, res) => {
    res.send(await getAds());
})

const checkJwt = jwt({
    secret: jwtRSA.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: 'https://authwale.auth0.com/.well-known/jwks.json'
        }),
        audience: 'http://authwale/api',
        issuer: 'https://authwale.auth0.com/',
        algorithms: ['RS256']
})

app.use(checkJwt);

// post route
app.post('/', async(req, res) => {
    const newAd = req.body;
    await insertAd(newAd);
    res.send({message: 'New Ad inserted'});
})
// delete route
app.delete('/:id', async (req, res) => {
    await deleteAd(req.params.id);
    res.send({message: 'ad removed'});
})

// endpoint to update
app.put('/:id', async (req, res) => {
    const updateAd = req.body;
    await updateAd(req.params.id, updateAd);
    res.send({ message: 'Id updated'});
})

// start the in-memory mongodb server
startDatabase().then(async () => {
    await insertAd({title: 'Hello now from in memory database'});
})

// listening server
app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
})
