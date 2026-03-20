import express from "express";
import Session from "../models/Session";

const router = express.Router();

// Helper: detect anomalies
function detectAnomalies(preWeight: number, postWeight: number, dryWeight: number, systolicBP: number, duration: number) {
  const anomalies: string[] = [];
  const weightGain = preWeight - dryWeight;

  // Example thresholds
  if (weightGain > 2) anomalies.push("Excessive Interdialytic Weight Gain");
  if (systolicBP > 140) anomalies.push("High Systolic BP");
  if (duration < 180 || duration > 240) anomalies.push("Abnormal session duration");

  return anomalies;
}

// Add session
router.post("/", async (req, res) => {
  try {
    const { patient, preWeight, postWeight, systolicBP, diastolicBP, duration, machineID, nurseNotes, dryWeight } = req.body;

    const anomalies = detectAnomalies(preWeight, postWeight, dryWeight, systolicBP, duration);

    const session = new Session({ patient, preWeight, postWeight, systolicBP, diastolicBP, duration, machineID, nurseNotes, anomalies });
    const saved = await session.save();

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get all sessions (optionally by patient)
router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find().populate("patient");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;