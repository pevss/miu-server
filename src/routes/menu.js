const express = require("express");
const router = express.Router();

const database = require("../database/databaseConnection");

router.post("/", (req, res) => {
	const { mealComponentId } = req.body;

	database.query(
		`call addMealComponentToCurrentMenu(${mealComponentId})`,
		(err, results) => {
			if (err) {
				res.status(400).send({
					status: 400,
					message: `Não foi possível adicionar esse componente ao menu. Tente novamente. ${err.message}`,
					error: err.stack,
				});
			}

			const mealComponents = results[0];

			res.status(200).send({
				status: 200,
				message: "Componente adicionado ao menu.",
				data: {
					mealComponents,
				},
			});
		}
	);
});

router.get("/", (_, res) => {
	database.query("call getCurrentMenu()", (_, results) => {
		const menuId = results[0][0].menuId;
		const mealComponents = results[0];

		res.status(200).send({
			status: 200,
			data: {
				menuId,
				mealComponents,
			},
		});
	});
});

module.exports = router;
