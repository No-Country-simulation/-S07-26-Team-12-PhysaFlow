import {Router} from "express"
import calculationRoutes from "./calculation.routes.js";
import leadRoutes from "./lead.rotes.js";
import sharedResultRoutes from "./sharedResultRoutes.js";
import sharedResultRoutes from "./sharedResult.routes.js";

const router = Router();

router.use("/calculations", calculationRoutes);
router.use("/leads", leadRoutes);
router.use("/shared-results", sharedResultRoutes);

export default router;