const express = require("express");

// express setup
const app = express();
const PORT = process.env.POPT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
