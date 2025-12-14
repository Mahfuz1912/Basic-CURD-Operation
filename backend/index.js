const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://smahfuz945_db_user:eSbb005n6hE3i9dz@cluster0.uf9fl2q.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


// Async function to run the database operations
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // const database = client.db("userDB");
    const usersCollection = client.db("userDB").collection("users");

    // CRUD Operations Start Here

    // Read Operation - Get all users
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const users = await cursor.toArray();
      res.send(users);
    });

    // Create Operation - Add a new user
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("New User:", user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Update Operation - Update a user by ID
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      console.log("Update User:", id, updatedUser);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUserInfo = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const result = await usersCollection.updateOne(filter, updatedUserInfo, options);
      res.send(result );
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });


    // Delete Operation - Delete a user by ID
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Delete User with id:", id);
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });
    // CRUD Operations End Here

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Root Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
