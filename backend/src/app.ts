import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // VERY IMPORTANT

// MongoDB connection
mongoose.connect("mongodb+srv://navyasriuggina:Na123@cluster0.fgjcoa0.mongodb.net/dialysis?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ Updated schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  dryWeight: { type: Number, required: true }
});

const Patient = mongoose.model("Patient", patientSchema);

// Routes
app.get("/api/patients", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

app.post("/api/patients", async (req, res) => {
  try {
    console.log("BODY:", req.body); // DEBUG

    const patient = new Patient(req.body);
    await patient.save();

    res.json(patient);
  } catch (error) {
    console.log("ERROR:", error); // DEBUG
    res.status(500).json({ error: "Server error" });
  }
});

// Update a patient
app.put("/api/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,       // patient ID from URL
      req.body,            // new values from frontend
      { new: true }        // return the updated document
    );
    res.json(patient);     // send updated patient back to frontend
  } catch (error) {
    console.log("ERROR updating patient:", error);
    res.status(500).json({ error: "Error updating patient" });
  }
});

// DELETE a patient
app.delete("/api/patients/:id", async (req, res) => {
  try {
    const patientId = req.params.id; // get patient ID from URL
    await Patient.findByIdAndDelete(patientId); // delete from MongoDB
    res.json({ message: "Patient deleted successfully" }); // response to frontend
  } catch (error) {
    console.log("ERROR deleting patient:", error);
    res.status(500).json({ error: "Error deleting patient" });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));