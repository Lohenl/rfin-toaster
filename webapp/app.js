/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var https = require('https')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// TODO: Aint no time to sanitize app credentials RIP
const ekycConfigs = {
  url: '',
  name: 'razer-group-116',
  key: 'w4RoI25eP70bdceJHcWR'
};
const mambuConfigs = {
  url: 'razerhackathon.sandbox.mambu.com',
  teamname: 'Team115',
  password: 'pass27521165EA'
};
const perxConfigs = {
  email: 'admin@razerhackathon_116.com',
  password: 'fkXblTnecZ',
  useracctid: '1',
  appleveltoken: '20fe3540c39d448609c26c9c72eb4ed4a3e6fb44ea813564bada2acb7a8674ef',
  userleveltoken: '01c1ee0fcaa2b3c25374d5220dd38f5db6d1622a6ac7030bf94b180149ee58be'
};
const visaConfigs = {

};

/**********************
 * Example get method *
 **********************/

app.get('/api', function(req, res) {
  // Add your code here
  console.log('plain get request received')
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/api/mambu-getiddocument', function(req, res) {
  let options = {
    hostname: 'razerhackathon.sandbox.mambu.com',
    path: '/api/settings/iddocumenttemplates',
    headers: {
        'Authorization': 'Basic ' + new Buffer(mambuConfigs.teamname + ':' + mambuConfigs.password).toString('base64'),
        'Accept':'*/*',
        'Content-Type': 'application/json'
    }   
  }
  var req = https.get(options, r => {
    r.setEncoding('utf8');
    r.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        res.status(r.statusCode).send(chunk);
    });
  })
  req.on('error', function(e) {
    res.status(500).send(e || 'Unspecified Error');
  });
});

// app.get('/api/*', function(req, res) {
//   // Add your code here
//   res.json({ success: 'get call succeed!', url: req.url });
// });

/****************************
 * Example post method *
 ****************************/

app.post('/api', function(req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

app.post('/api/*', function(req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
 * Example put method *
 ****************************/

app.put('/api', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/api/*', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/api', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/api/*', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
