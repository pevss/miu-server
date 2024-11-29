const { API_PORT } = require("./config");

const express = require("express");
const cors = require("cors");

const app = express();

const mealComponent = require("./routes/mealComponent");
const menu = require("./routes/menu");
const macronutrients = require("./routes/macronutrient");

app.use(cors());
app.use(express.json());

app.use("/mealComponent", mealComponent);
app.use("/menu", menu);
app.use("/macronutrients", macronutrients);

app.listen(API_PORT, () => {
	console.log(`The server is running at port ${API_PORT}`);
});
