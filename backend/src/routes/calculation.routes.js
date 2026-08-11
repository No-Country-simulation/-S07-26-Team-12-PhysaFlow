import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";

import CalculationRepository from "../repositories/CalculationRepository.js";
import CalculationService from "../services/calculation.service.js";
import CalculationController from "../controllers/calculation.controller.js";

const repository = new CalculationRepository();
const service = new CalculationService({ calculationRepository: repository });
const controller = new CalculationController(service);

const router = Router();

// router.get("/");
// router.get("/:id");

/**
 * @swagger
 * /api/calculations/calculate:
 *   post:
 *     tags: [Calculation]
 *     summary: Crear un nuevo cálculo de capacidad varada
 *     description: |
 *       Recibe los parámetros de una instalación, calcula la capacidad varada
 *       y la pérdida anual estimada, persiste el resultado y devuelve el
 *       Calculation creado.
 *
 *       La lógica actual utiliza el primer elemento del array `cooling_type`
 *       para el cálculo del factor de enfriamiento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalculationCreateInput'
 *           examples:
 *             cooling_aire:
 *               summary: Cálculo con cooling de aire
 *               value:
 *                 facility_size_mw: 20
 *                 utilization_percentage: 80
 *                 cooling_type:
 *                   - air
 *             cooling_hibrido:
 *               summary: Cálculo con cooling híbrido (aire + líquido)
 *               value:
 *                 facility_size_mw: 100
 *                 utilization_percentage: 70
 *                 cooling_type:
 *                   - air
 *                   - liquid
 *     responses:
 *       201:
 *         description: Cálculo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Calculation'
 *             example:
 *               success: true
 *               data:
 *                 id: a1b2c3d4-e5f6-7890-abcd-ef1234567890
 *                 lead_id: null
 *                 facility_size_mw: 20
 *                 utilization_percentage: 80
 *                 cooling_type:
 *                   - air
 *                 stranded_capacity_percent: 0.22
 *                 stranded_capacity_mw: 4.4
 *                 annual_loss_min: 1100000
 *                 annual_loss_max: 1980000
 *                 formula_version: v1.0.1
 *                 createdAt: 2026-08-11T12:00:00.000Z
 *                 updatedAt: 2026-08-11T12:00:00.000Z
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/calculate", catchAsync(controller.create));

// router.put("/:id");
// router.delete("/:id");

export default router;
