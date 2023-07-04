const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://akramzaki:akramzaki28@usim1.mw7rolt.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to retrieve the list of databases
async function getDatabaseList() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Get the list of databases
    const adminDb = client.db('admin');
    const databases = await adminDb.admin().listDatabases();

    // Extract the database names
    const databaseNames = databases.databases.map(db => db.name);

    return databaseNames;
  } catch (error) {
    console.error('Error retrieving database list:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Call the function to retrieve the database list
getDatabaseList()
  .then(databaseNames => {
    console.log('List of databases:');
    console.log(databaseNames);
  })
  .catch(error => {
    console.error('Error:', error);
  });
