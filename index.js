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
const bannerImgCollect = client.db("AdminPkPPDboard").collection("bannerImg");
const collectColorCode = client.db('AdminPkPPDboard').collection("colorCode")

//Post LogoImage
app.post("/logoImg", async (req, res) => {
    const logoImg = req.body;
    const addLogoImage = await logoImgCollect.insertOne(logoImg);
    console.log(addLogoImage);
    res.send(addLogoImage); 
});
//get LogoImage
  app.get("/logoImg", async (req, res) => {
    const logoImg = {};
    const getLogoImg = await logoImgCollect.find(logoImg).toArray();
    console.log(getLogoImg);
    res.send(getLogoImg);
  });

  //Post banner Image
app.post("/bannerImg", async (req, res) => {
  const bannerImg = req.body;
  const addLogoImage = await bannerImgCollect.insertOne(bannerImg);
  console.log(addLogoImage);
  res.send(addLogoImage); 
});
//get banner Image
app.get("/bannerImg", async (req, res) => {
  const bannerImg = {};
  const getBannerImg = await bannerImgCollect.find(bannerImg).toArray();
  console.log(getBannerImg);
  res.send(getBannerImg);
});
//Post color code
app.post("/colorCode", async (req, res) => {
  const colorCode = req.body;
  const addColorCode = await colorCodeCollect.insertOne(colorCode);
  console.log(addColorCode);
  res.send(addColorCode); 
});
//get color code
app.get("/colorCode", async (req, res) => {
  const colorCode = {};
  const getColorCode = await colorCodeCollect.find(colorCode).toArray();
  console.log(getColorCode);
  res.send(getColorCode);
});
//Post todoItems data
app.post("/todoItems", async (req, res) => {
  const todoItems = req.body;
  const saveTodoItems = await todoItemsCollect.insertOne(todoItems);
  console.log(saveTodoItems);
  res.send(saveTodoItems); 
});
//get todoItems data
app.get("/todoItems", async (req, res) => {
  const todoItems = {};
  const getTodoItems = await todoItemsCollect.find(todoItems).toArray();
  console.log(getTodoItems);
  res.send(getTodoItems);
});





// get welcome pakapep server by default
app.get("/", (req, res) => {
    res.send("Welcome to Paka Pepe");
});

app.listen(port, () => {
  console.log(`Paka Pepe server is running ${port}`);
});


run().catch((error) => console.error(error));