const express = require("express");
const apiRouter = express.Router();
const db = require("../db/poolConnector");

function calculateDistance(lat1, lat2, long1, long2) {
	// uses Havrsine formula to calculate distance between two points on the earth
	const toRadians = (deg) => (deg * Math.PI) / 180;

	const R = 6371; // radius of the earth in kilometers
	const dLat = toRadians(lat2 - lat1);
	const dLong = toRadians(long2 - long1);

	const angle =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) *
		Math.cos(toRadians(lat2)) *
		Math.sin(dLong / 2) *
		Math.sin(dLong / 2);

	const c = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle));
	return R * c; // distance in kilometers
}

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

apiRouter.get("/listSchools", async (req, res) => {
	try {
		const { lat, long } = req.query;

		// validate inputs
		if (!lat || !long) {
			return res.status(400).json({
				err: "missing_fields",
			});
		}

		// parse to float
		const latitude = parseFloat(lat);
		const longitude = parseFloat(long);

		if (isNaN(latitude) || isNaN(longitude)) {
			return res.status(400).json({
				err: "latitude_and_longitude_must_be_numbers",
			});
		}

		// get all schools from db
		const [schools] = await db.query(`SELECT * FROM Schools`);
		console.log(schools);

		// sort the schools by distance from the given point
		const sortedSchools = schools.sort((a, b) => {
			const distA = calculateDistance(
				latitude,
				a.latitude,
				longitude,
				a.longitude,
			);
			const distB = calculateDistance(
				latitude,
				b.latitude,
				longitude,
				b.longitude,
			);
			return distA - distB;
		});
		return res.status(200).json(sortedSchools);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			err: err.message,
		});
	}
});

module.exports = apiRouter;
