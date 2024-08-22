const express = require("express");
const apiRouter = express.Router();
const db = require("../db/poolConnector");

apiRouter.post("/addSchool", async (req, res) => {
	try {
		const { name, address, latitude, longitude } = req.body;

		// validate all inputs
		if (!name || !address || longitude == undefined || latitude == undefined) {
			return res.status(400).json({
				err: "missing_fields",
			});
		}

		if (typeof latitude != "number" || typeof longitude != "number") {
			return res.status(400).json({
				err: "latitude_and_longitude_must_be_numbers",
			});
		}

		// insert school into the db
		const [result] = await db.query(
			`INSERT INTO Schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
			[name, address, latitude, longitude],
		);

		res.status(201).json({
			info: "school_added",
			schoolId: result.insertId,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			err: err.message,
		});
	}
});

module.exports = apiRouter;
