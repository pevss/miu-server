const express = require("express");
const router = express.Router();

const database = require("../database/databaseConnection");

router.get("/:macronutrientId", (req, res) => {
	const { macronutrientId } = req.params;

	database.query(
		`call getMacronutrientTypesByMacronutrient(${macronutrientId})`,
		(err, results) => {
			if (err) {
				res.status(400).send({
					status: 400,
					message: err.message,
					error: err.stack,
				});
			}

			const macronutrientTypes = results[0];

			res.status(200).send({
				status: 200,
				data: {
					macronutrientTypes,
				},
			});
		}
	);
});

module.exports = router;
