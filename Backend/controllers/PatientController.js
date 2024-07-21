const Counter = require("../models/CounterModel");
const Patient = require("../models/PatientModel");

const addPatient = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "autovalPatient" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const patient = new Patient({
      id: counter.seq,
      ...req.body,
    });

    await patient.save();

    res.status(201).json({
      status: "success",
      message: "Added Patient",
      patient: patient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const editPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const updatedPatient = await Patient.findOneAndUpdate(
      { id: patientId },
      req.body,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Patient updated",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const deletedPatient = await Patient.findOneAndDelete({
      id: patientId,
    });

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Patient deleted",
      participant: deletedPatient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const getUserPatients = async (req, res) => {
  try {
    const userId = req.params.userId;
    const patients = await Patient.find({
      userId,
    });

    return res.status(200).json({
      status: "success",
      message: "Patient retrieved",
      patients: patients,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

module.exports = {
  addPatient,
  deletePatient,
  editPatient,
  getUserPatients,
};
