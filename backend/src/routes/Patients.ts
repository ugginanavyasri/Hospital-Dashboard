import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  name: string;
  age: number;
  gender: string;
  dryWeight: number;
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },      // MUST exist
  dryWeight: { type: Number, required: true },   // MUST exist
});

export default mongoose.model<IPatient>("Patient", PatientSchema);