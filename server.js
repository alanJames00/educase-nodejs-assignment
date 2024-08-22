const express = require("express");
require("dotenv").config({
	path: "./.env",
});
const cors = require("cors");
const schoolRouter = require("./routes/schools");

// express setup
const app = express();
const PORT = process.env.POPT || 3000;

// middlewares and routers setup
app.use(cors());
app.use(express.json());

app.use("/school", schoolRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
