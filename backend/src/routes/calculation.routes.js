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

router.post("/", catchAsync(controller.create));

// router.put("/:id");
// router.delete("/:id");

export default router;
