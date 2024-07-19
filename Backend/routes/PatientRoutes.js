const express = require("express");
const router = express.Router();
const {
  addPatient,
  deletePatient,
  editPatient,
  getUserPatients,
} = require("../controllers/PatientController");

router.post("/add", addPatient);
router.post("/edit/:patientId", editPatient);
router.delete("/delete/:patientId", deletePatient);
router.get("/get-patients/:userId", getUserPatients);

module.exports = router;
