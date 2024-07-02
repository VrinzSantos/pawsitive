import express from "express";
import {
  getAppointments,
  updateStatusController,
  deleteAppointmentController,
  bookAppointnmentController,
  getFullyBookedAppointments,
} from "../controllers/appointment.controller";
const router = express.Router();
router.get("/", (req, res) => {
  res.json("success");
});

router.get("/appointments", getAppointments);
router.patch("/update", updateStatusController);
router.delete("/delete/:id", deleteAppointmentController);
router.post("/book-appointment", bookAppointnmentController);
router.get("/fully-booked-appointments", getFullyBookedAppointments);

export default router;
