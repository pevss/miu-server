const express = require("express");
const router = express.Router();

const database = require("../database/databaseConnection");

router.post("/", (req, res) => {
	const {
		mealComponent: {
			name,
			description,
			defaultPortion,
			macronutrientTypeId,
			ingredients,
		},
	} = req.body;

	database.query(
		`call createMealComponent('${name}', '${description}', ${defaultPortion}, ${macronutrientTypeId})`,
		(err, results) => {
			if (err) {
				res.status(400).send({
					status: 400,
					message: `Não foi possível adicionar esse componente. ${err.message}`,
					error: err.stack,
				});
			}

			const { createdComponentId } = results[0];

			ingredients.forEach(
				({ name, quantity, calories, protein, fat, fibers, carbo }) => {
					database.query(
						`call addIngredientToMealComponent(${mealComponentId}, '${name}', ${quantity}, ${calories}, ${protein}, ${fibers}, ${fat}, ${carbo})`,
						(err) => {
							if (err) {
								// TODO: ROLLBACK DE TODA A CRIACAO
								res.status(400).send({
									status: 400,
									mensagem: `Ocorreu algum erro ao adicionar o ingrendiete ${name}. Por favor, revise os dados inseridos. ${err.message}`,
									error: err.stack,
								});
							}
						}
					);
				}
			);

			res.status(200).send({
				status: 200,
				message: `${name} criado com sucesso!`,
				data: {
					createdComponentName: name,
					createdComponentId,
				},
			});
		}
	);
});

router.get("/:macronutrientId", (req, res) => {
	const { macronutrientId } = req.params;

	database.query(
		`call getMealComponentsByMacronutrient(${macronutrientId})`,
		(err, results) => {
			if (err) {
				res.status(400).send({
					status: 400,
					message: `Algo de errado aconteceu ao buscar os componentes dessa classe de macronutrientes. Tente novamente. ${err.message}`,
					error: err.stack,
				});
			}

			const mealComponents = results[0];

			res.status(200).send({
				status: 200,
				data: {
					mealComponents,
				},
			});
		}
	);
});

module.exports = router();
