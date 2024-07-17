const cors = require('cors');
const express = require('express');

//const Halls = require('./models/addhall'); // Assuming you have a FormData model defined


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res) => {
    res.send('Hello World');
})
// Connect to MongoDB Atlas

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://demo:EVrW97ur3rpfr2ki@cluster0.uleztmv.mongodb.net/hall?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const hallcollection = client.db("HallManagement").collection("halls");
    app.post("/upload-hall", async (req, res) => {
        try {
          const data = req.body;
          const result = await hallcollection.insertOne(data);
          res.status(201).json({ message: "hall uploaded successfully", insertedId: result.insertedId });
        } catch (error) {
          console.error("Error uploading hall:", error);
          res.status(500).json({ message: "An error occurred while uploading the hall" });
        }
      });
      const Eventcollection = client.db("HallManagement").collection("Event");
    app.post("/upload-event", async (req, res) => {
        try {
          const data = req.body;
          const result = await Eventcollection.insertOne(data);
          res.status(201).json({ message: "hall uploaded successfully", insertedId: result.insertedId });
        } catch (error) {
          console.error("Error uploading event:", error);
          res.status(500).json({ message: "An error occurred while uploading the event" });
        }
      });
      // Get all books
    app.get("/all-hall", async (req, res) => {
        try {
          const hall = await hallcollection.find().toArray();
          res.send(hall);
        } catch (error) {
          console.error('Error fetching all hall:', error);
          res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
      });
      app.get("/all-event", async (req, res) => {
        try {
          const event = await Eventcollection.find().toArray();
          res.send(event);
        } catch (error) {
          console.error('Error fetching all hall:', error);
          res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
      });
      app.get("/all-event/:email", async (req, res) => {
        try {
          const userEmail = req.params.email;
          //const { eventId } = req.params;
          const event = await Eventcollection.findOne({email: userEmail});
          console.log(event);
          res.send(event);
        } catch (error) {
          console.error('Error fetching all hall:', error);
          res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
      });
      app.put('/cancel-event/:email', async (req, res) => {
       // const { eventId } = req.params;

try {
    // Find the event by ID in the database
    const userEmail = req.params.email;
    const event = await Eventcollection.findOneAndUpdate(
        {email: userEmail},
        { $set: { isconfirmed: 'booking canceled' } },
        { new: true }
    );
    console.log(event)
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }
    return res.json(event);
} catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ error: 'Internal server error' });
}


    });
    
      // Delete a book
      app.delete("/delete-hall/:id", async (req, res) => {
        try {
          const name = req.params.name;
          const filter = { title: name };
          const result = await hallcollection.deleteOne(filter);
          if (result.deletedCount > 0) {
            res.json({ message: 'hall deleted successfully', result });
          } else {
            res.status(404).json({ message: 'hall not found' });
          }
        } catch (error) {
          console.error('Error deleting hall from MongoDB:', error);
          res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
      });
      
      

     
      // Assuming 'medicinecollection' is your MongoDB collection
// Import ObjectId from the MongoDB library
const { ObjectId } = require('mongodb');

// Assuming 'medicinecollection' is your MongoDB collection

       const registerCollection= client.db("HallManagement").collection("user");
       const adminCollection= client.db("HallManagement").collection("admin");
       const organizerCollection= client.db("HallManagement").collection("organizer");
       
        // Define a route for user registration
        app.post("/register", async (req, res) => {
            try {
              const { email, password } = req.body;
         
              if (email === 'admin@gmail.com') {
                // Create a record for the admin in the customer database
                const adminData = { email: email, password: password};
                const result = await adminCollection.insertOne(adminData);
         
                res.status(201).json({
                  message: "Admin registered successfully",
                  insertedId: result.insertedId
                });
              }
              else if (email === 'organizer@gmail.com') {
                // Create a record for the admin in the customer database
                const organizerData = { email: email, password: password};
                const result = await organizerCollection.insertOne(organizerData);
         
                res.status(201).json({
                  message: "organizer registered successfully",
                  insertedId: result.insertedId
                });
              }
              else {
                // For regular user registration
                const userData = { email: email, password: password};
                const result = await registerCollection.insertOne(userData);
         
                res.status(201).json({
                  message: "User registered successfully",
                  insertedId: result.insertedId
                });
              }
            } catch (error) {
              console.error("Error registering user:", error);
              res.status(500).json({
                message: "An error occurred while registering the user"
              });
            }
          });
         
       
    // User login endpoint
    app.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
    
        if (email === 'admin@gmail.com') {
          const admin = await adminCollection.findOne({ email: email });
          if (admin && admin.password === password) {
            res.json({ message: "Admin", user: admin });
          } else {
            res.json({ message: "Incorrect email or password" });
          }
        } else if (email === 'organizer@gmail.com') {
          const organizer = await organizerCollection.findOne({ email: email });
          if (organizer && organizer.password === password) {
            res.json({ message: "Organizer", user: organizer });
          } else {
            res.json({ message: "Incorrect email or password" });
          }
        } else {
          // For users, use your existing backend logic
          // Assuming it's a function called `checkUserLogin`
          const user = await registerCollection.findOne({ email: email });
          if (user) {
            res.json({ message: "Success", user: user });
          } else {
            res.json({ message: "User not found or incorrect password" });
          }
        }
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "An error occurred while logging in" });
      }
    });
    
    // Express route to fetch user profile data
    app.get('/event/:email', async (req, res) => {
      try {
        const userEmail = req.params.email;
        // Query the database to find the user with the provided email
        const user = await Eventcollection.findOne({ email: userEmail });
        console.log(user)
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        // Return the user's profile data
        res.json(user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "An error occurred while fetching user profile", error: error.message });
      }
    });
    
    // Backend route to fetch a single event associated with a user by their email

    app.delete('/event/:email', async (req, res) => {
      try {
        const userEmail = req.params.email;
        // Assume you have a function to delete the booking from the database based on the user's email
        // Replace deleteBookingFunction with the appropriate function for deleting the booking
        await Eventcollection.deleteOne({ email: userEmail });
        res.status(200).json({ message: 'Booking cancelled successfully' });
      } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ message: 'An error occurred while cancelling the booking' });
      }
    });
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});