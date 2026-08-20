import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";

import CalculationRepository from "../repositories/CalculationRepository.js";
import CalculationService from "../services/calculation.service.js";
import CalculationController from "../controllers/calculation.controller.js";
import CalculationPdfService from "../services/calculationPdf.service.js";
import CalculationPdfController from "../controllers/calculationPdf.controller.js";

const repository = new CalculationRepository();
const service = new CalculationService({ calculationRepository: repository });
const controller = new CalculationController(service);
const pdfService = new CalculationPdfService({ calculationRepository: repository });
const pdfController = new CalculationPdfController(pdfService);

const router = Router();

/**
 * @swagger
 * /api/calculations:
 *   get:
 *     tags: [Calculation]
 *     summary: Obtener cálculos por lead_id
 *     description: Recupera todos los cálculos asociados a un lead mediante su UUID
 *     parameters:
 *       - in: query
 *         name: lead_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID del lead
 *         example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *     responses:
 *       200:
 *         description: Lista de cálculos del lead
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Calculation'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", catchAsync(controller.findByLeadId));

/**
 * @swagger
 * /api/calculations/{id}:
 *   get:
 *     tags: [Calculation]
 *     summary: Obtener un cálculo por ID
 *     description: Recupera un cálculo de capacidad varada existente mediante su UUID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID del cálculo
 *         example: a1b2c3d4-e5f6-7890-abcd-ef1234567890
 *     responses:
 *       200:
 *         description: Cálculo encontrado
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
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:id", catchAsync(controller.findById));

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

/**
 * @swagger
 * /api/calculations/{id}/pdf:
 *   get:
 *     tags: [Calculation]
 *     summary: Generar y descargar PDF de un cálculo
 *     description: |
 *       Genera un PDF profesional con los datos de un cálculo.
 *       Si se proporciona compare_with, genera un PDF comparativo entre ambos cálculos.
 *       Ambos cálculos deben pertenecer al mismo lead para comparar.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID del cálculo
 *       - in: query
 *         name: compare_with
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID del segundo cálculo para comparación
 *     responses:
 *       200:
 *         description: Archivo PDF generado
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         description: Conflicto - cálculos de diferentes leads
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:id/pdf", catchAsync(pdfController.generate));

// router.put("/:id");
router.delete("/:id", catchAsync(controller.delete));

export default router;
