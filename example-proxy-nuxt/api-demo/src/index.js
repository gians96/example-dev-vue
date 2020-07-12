const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const config = require('./config.js');

// defining the Express app
const app = express();
// middleware to protect routes
const protectedRoutes = express.Router();

app.use('/api', protectedRoutes);

protectedRoutes.use((req, res, next) =>{
  // check header for the token
  var token = req.headers['access-token'];
  // decode token
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, app.get('Secret'), (err, decoded) =>{
      if (err) {
        return res.json({ message: 'invalid token' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
    } else {
    // if there is no token
    res.send({
        message: 'No token provided.'
    });
  }
});

// defining an array to work as the database (temporary solution)
const ads = [];

//set secret
app.set('Secret', config.secret);

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.post('/authenticate', (req,res) => {
  if(req.body.username === "test"){
    if(req.body.password === 'TestPW') {
       //if eveything is okey let's create our token
      const payload = {
        check:  true
      };
      var token = jwt.sign(payload, app.get('Secret'), {
        expiresIn: '365d' // expires in 365 days
      });
      res.json({
        message: 'authentication done ',
        token: token
      });
    } else {
        res.json({message:"please check your password !"})
      }
    } else {
      res.json({message:"user not found !"})
    }
})

// defining an endpoint to return all ads
app.get('/api', async (req, res) => {
  fs.readFile('src/data/testData.json', (err, data) => {
    if (err) throw err;
    let testData = JSON.parse(data);
    console.log('read: ', testData);
    res.send(testData);
    // res.send('ok');
  });
});

app.post('/api', async (req, res) => {
  let testData = req.body.testData;
  console.log(req.body);
  let data = JSON.stringify(testData);
  fs.writeFileSync('src/data/testData.json', data);
  res.send('ok');
});

// start the server
app.listen(3001, async () => {
  console.log('listening on port 3001');
});
