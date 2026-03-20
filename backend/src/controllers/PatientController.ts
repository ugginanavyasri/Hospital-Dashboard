import { Request, Response } from "express";
import Patient from "../models/Patient";

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patients" });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    console.log("BODY RECEIVED:", req.body); // for debugging

    const patient = new Patient({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      dryWeight: req.body.dryWeight,
    });

    await patient.save();

    console.log("SAVED PATIENT:", patient); // check saved fields
    res.json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating patient" });
  }
};