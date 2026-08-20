import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";

import LeadRepository from "../repositories/LeadRepository.js";
import CalculationRepository from "../repositories/CalculationRepository.js";
import LeadService from "../services/lead.service.js";
import LeadController from "../controllers/lead.controller.js";

const leadRepository = new LeadRepository();
const calculationRepository = new CalculationRepository();
const service = new LeadService({ leadRepository, calculationRepository });
const controller = new LeadController(service);

const router = Router();

/**
 * @swagger
 * /api/leads/register:
 *   post:
 *     tags: [Lead]
 *     summary: Vincular un cálculo existente con un lead por email
 *     description: |
 *       Busca un Lead por email (lo crea si no existe) y asigna ese lead
 *       al cálculo indicado mediante calculation_id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, calculation_id]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *                 example: usuario@example.com
 *               calculation_id:
 *                 type: string
 *                 format: uuid
 *                 description: UUID del cálculo a vincular
 *                 example: a1b2c3d4-e5f6-7890-abcd-ef1234567890
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente. Cálculo vinculado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuario creado exitosamente. Cálculo vinculado correctamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/register", catchAsync(controller.register));

export default router;
