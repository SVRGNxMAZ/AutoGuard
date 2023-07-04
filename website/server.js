// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://akramzaki:akramzaki28@usim1.mw7rolt.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});

const app = express();
const port = 3000;


const dbName = 'project101';
const collectionName = 'user';

app.use(express.static('public'));
app.use(express.json());
// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

client.connect()
  .then(() => {
    console.log("Connected successfully to server");
  })
  .catch(() => {
    console.log("Error connecting to server");
  });


  async function getUserById(userId) {

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
  
    const query = { UserID: userId };
    const user = await collection.findOne(query);
  
    return user;
  }


app.get("/",(req,res)=>{
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.redirect('index.html');
});

app.get('/login', async (req, res) => {
  
    res.sendFile(__dirname + '/public/loginPage.html');
    
});

app.post('/login', async (req, res) => {

  const userID = req.body.UserID;
  const password = req.body.Password;
  
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const query = { UserID: userID, Password: password };
  const user = await collection.findOne(query);

  console.log('Received login request:', req.body);

    if (user) {
      console.log('Login Successful');
      req.session.userId = userID;
      res.sendStatus(200); // Login successful
    } else {
      console.log('Login Unsuccessful');
      res.sendStatus(401); // Invalid credentials
    }
});



app.get('/SignUp', (req, res) => {

  res.sendFile(__dirname + '/public/SignUp.html');

});

// Handle POST request for signup
app.post('/SignUp', async(req, res) => {
  console.log('Received signup request:', req.body);
  const newUser = req.body;
    // Select the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const sentsignup = await collection.insertOne(newUser);
  
    if (sentsignup) {
      console.log('Singup Successful');
      res.sendStatus(200); // signup successful
    } else {
      console.log('Singup Unsuccessful');
      res.sendStatus(401); // Signup unsuccessful
    }

});

app.get('/dashboard', async(req, res) => {

  const userId = req.session.userId;

  try {
    const user = await getUserById(userId);

    if (user) {
      // Render the HTML page with user data
      res.render('dashboard', { user: user });
    } else {
      // Handle case where user is not found
      res.status(404).send('User not found');
    }
  } catch (error) {
    // Handle any errors that occur during database access
    console.error('Error retrieving user:', error);
    res.status(500).send('Internal server error');
  }
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});