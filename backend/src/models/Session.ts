import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  patient: mongoose.Types.ObjectId;
  date: Date;
  preWeight: number;
  postWeight: number;
  systolicBP: number;
  diastolicBP: number;
  duration: number; // in minutes
  machineID: string;
  nurseNotes?: string;
}

const SessionSchema: Schema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  date: { type: Date, default: Date.now },
  preWeight: { type: Number, required: true },
  postWeight: { type: Number, required: true },
  systolicBP: { type: Number, required: true },
  diastolicBP: { type: Number, required: true },
  duration: { type: Number, required: true },
  machineID: { type: String, required: true },
  nurseNotes: { type: String },
});

export default mongoose.model<ISession>("Session", SessionSchema);