export interface Patient {
  _id: string;
  name: string;
  age: number;
  dryWeight: number;
}

export interface Session {
  _id: string;
  patient: Patient;
  preWeight: number;
  postWeight: number;
  systolicBP: number;
  diastolicBP: number;
  duration: number;
  machineID: string;
  nurseNotes?: string;
  anomalies: string[];
}