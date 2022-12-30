const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middle ware
require("dotenv").config();
app.use(cors());
app.use(express.json());


// Pakapepe Admin Dashboard Database connect
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.SERVER_NAME}:${process.env.Pakapepe_Admin_Dashboard_Key}@cluster0.mlxcjcs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Pakapepe Admin Dashboard Database run
async function run() {
  try {
    await client.connect();
    console.log(" Pakapepe Admin Dashboard Database connect");
  } catch (error) {
    console.error(error);
  }
}

// All collection 
const logoImgCollect = client.db("AdminPkPPDboard").collection("logoImg");


app.post("/logoImg", async (req, res) => {
    const logoImg = req.body;
    const addLogoImage = await logoImgCollect.insertOne(logoImg);
    console.log(addLogoImage);
    res.send(addLogoImage);
  });

  app.get("/logoImg", async (req, res) => {
    const logoImg = {};
    const saveUser = await logoImgCollect.find(logoImg).toArray();
    console.log(saveUser);
    res.send(saveUser);
  });




// get welcome pakapep server by default
app.get("/", (req, res) => {
    res.send("Welcome to Paka Pepe");
  });

app.listen(port, () => {
  console.log(`Paka Pepe server is running ${port}`);
});



run().catch((error) => console.error(error));