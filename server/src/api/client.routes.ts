import express from "express";
import {
  clientDataController,
  createClientRecordsController,
  deleteClientRecordsController,
  editClientRecordsController,
  addPetHistoryController,
  addMedicationController,
} from "../controllers/client_records.controller";
const router = express.Router();

router.get("/", clientDataController);
router.post("/create-record", createClientRecordsController);
router.delete("/delete-record/:id", deleteClientRecordsController);
router.patch("/update-record", editClientRecordsController);
router.post("/add-pet-history", addPetHistoryController);
router.post("/add-pet-medication", addMedicationController);

export default router;
