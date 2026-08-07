import {Routes} from "express";
import {
    createSharedResult,
    getSharedResults,
    getSharedResultByToken,
    deleteSharedResult,
} from "../models/Sharedresult.js";

const router = Router();

router.post("/", createSharedResult);

router.get("/", getSharedResults);

router.get("/:token", getSharedResultByToken);

router.delete("/:id", deleteSharedResult);

export default router;